#from scholarly import scholarly

# Use author ID directly
#author = scholarly.search_author_id('0Vmk-fMAAAAJ')

# Fetch full details
#author = scholarly.fill(author)

# Print basic info
#print("Name:", author['name'])
#print("Affiliation:", author['affiliation'])
#print("Citations:", author['citedby'])
#print("h-index:", author['hindex'])
#print("\nPublications:\n")

#for pub in author['publications'][:20]:
#    pub = scholarly.fill(pub)
#    print(pub['bib']['title'])
import json
import time
from scholarly import scholarly

# Fetch author by ID
author = scholarly.search_author_id('0Vmk-fMAAAAJ')
time.sleep(2)

author = scholarly.fill(author)

publications = []

for pub in author['publications'][:62]:
    time.sleep(1)  # avoid blocking
    
    pub = scholarly.fill(pub)
    
    publications.append({
        "title": pub['bib'].get('title', 'No title'),
        "year": pub['bib'].get('pub_year', 'N/A'),
        "link": pub.get('pub_url', '#')
    })

# Save JSON
with open('publications.json', 'w', encoding='utf-8') as f:
    json.dump(publications, f, indent=4)

print("✅ publications.json created")
