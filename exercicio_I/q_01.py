import requests
from bs4 import BeautifulSoup

siteUrl = "https://docs.python.org/3/library/urllib.request.html"

siteResponseTags = requests.get(siteUrl).content

soup = BeautifulSoup(siteResponseTags, 'html.parser')

for a_tags in soup.find_all('a'):
    if a_tags is None:
        continue
    hrefLink = a_tags.get('href')
    print(hrefLink)