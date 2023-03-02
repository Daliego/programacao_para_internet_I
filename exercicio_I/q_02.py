import requests
from bs4 import BeautifulSoup

siteUrl = "https://docs.python.org/3/library/functions.html#print"

siteResponseTags = requests.get(siteUrl).content
soup = BeautifulSoup(siteResponseTags, 'html.parser')

def main():
    print("What tag < > do you want to see the content?")
    answer = input("Write here: ")

    for tags in soup.find_all(str(answer)):
        if tags is None:
            continue
        print(tags.string)

main()
