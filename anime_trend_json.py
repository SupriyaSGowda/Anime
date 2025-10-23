import pandas as pd
from sklearn.preprocessing import MinMaxScaler
import json
import re

# -------------------------------
# Helper function to read CSV safely
# -------------------------------
def safe_read_csv(file_path):
    try:
        df = pd.read_csv(file_path, encoding='utf-8-sig', delimiter=',')
        if df.empty or len(df.columns) <= 1:
            df = pd.read_csv(file_path, encoding='utf-8-sig', delimiter=';')
        return df
    except Exception as e:
        print(f"Error reading {file_path}: {e}")
        return pd.DataFrame()

# -------------------------------
# 1️⃣ Load Data
# -------------------------------
google = safe_read_csv('google_trends.csv')
reddit = safe_read_csv('reddit_trends.csv')

# Strip spaces from column names
google.columns = google.columns.str.strip()
reddit.columns = reddit.columns.str.strip()

# Debug: preview
print("Google CSV preview:")
print(google.head())
print("\nReddit CSV preview:")
print(reddit.head())

# -------------------------------
# 2️⃣ Define Keywords
# -------------------------------
keywords = ['anime', 'anime streetwear', 'kawaii outfit', 'Naruto']

# -------------------------------
# 3️⃣ Prepare Reddit Data
# -------------------------------
if 'created' in reddit.columns and 'title' in reddit.columns and 'score' in reddit.columns:
    reddit['date'] = pd.to_datetime(reddit['created'], errors='coerce', dayfirst=True).dt.date

    def find_keywords(title):
        title = str(title).lower()
        matched = [kw for kw in keywords if re.search(r'\b' + re.escape(kw.lower()) + r'\b', title)]
        return matched if matched else None

    reddit['matched_keywords'] = reddit['title'].apply(find_keywords)
    reddit_expanded = reddit.explode('matched_keywords').dropna(subset=['matched_keywords'])

    reddit_grouped = (
        reddit_expanded.groupby(['date', 'matched_keywords'])['score']
        .sum()
        .reset_index()
        .rename(columns={'matched_keywords': 'keyword', 'score': 'reddit_score'})
    )
else:
    reddit_grouped = pd.DataFrame(columns=['date', 'keyword', 'reddit_score'])

print("Reddit grouped shape:", reddit_grouped.shape)

# -------------------------------
# 4️⃣ Prepare Google Trends Data
# -------------------------------
if 'date' in google.columns:
    google_long = google.melt(id_vars=['date'], var_name='keyword', value_name='google_score')
    google_long['date'] = pd.to_datetime(google_long['date'], errors='coerce', dayfirst=True).dt.date
else:
    google_long = pd.DataFrame(columns=['date', 'keyword', 'google_score'])

print("Google long shape:", google_long.shape)

# -------------------------------
# 5️⃣ Normalize Scores
# -------------------------------
scaler = MinMaxScaler()

if not reddit_grouped.empty:
    reddit_grouped['reddit_score_norm'] = scaler.fit_transform(reddit_grouped[['reddit_score']])
else:
    reddit_grouped['reddit_score_norm'] = []
    print("⚠️ Reddit grouped is empty. Skipping normalization.")

if not google_long.empty:
    google_long['google_score_norm'] = scaler.fit_transform(google_long[['google_score']])
else:
    google_long['google_score_norm'] = []
    print("⚠️ Google trends data is empty. Skipping normalization.")

# -------------------------------
# 6️⃣ Merge and Combine
# -------------------------------
combined = pd.merge(reddit_grouped, google_long, on=['date', 'keyword'], how='outer')
combined[['reddit_score_norm', 'google_score_norm']] = combined[
    ['reddit_score_norm', 'google_score_norm']
].fillna(0)
combined['combined_score'] = (
    0.5 * combined['reddit_score_norm'] + 0.5 * combined['google_score_norm']
)

# -------------------------------
# 7️⃣ Add Natural-Language Text
# -------------------------------
combined['text'] = combined.apply(
    lambda row: (
        f"On {row['date']}, the keyword '{row['keyword']}' "
        f"had a normalized Reddit score of {row['reddit_score_norm']:.2f}, "
        f"a Google Trends score of {row['google_score_norm']:.2f}, "
        f"and a combined trend score of {row['combined_score']:.2f}."
    ),
    axis=1
)

# -------------------------------
# 8️⃣ Convert date to string for JSON
# -------------------------------
combined['date'] = combined['date'].astype(str)

# -------------------------------
# 9️⃣ Save to JSON
# -------------------------------
records = combined.to_dict(orient='records')
with open("combined_trends.json", "w", encoding='utf-8') as f:
    json.dump(records, f, ensure_ascii=False, indent=4)

print("✅ Saved combined_trends.json (ready for chunking & vector DB use)")
print(combined.head())
