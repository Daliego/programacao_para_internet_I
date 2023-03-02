import requests
from bs4 import BeautifulSoup

def findDivById(tags, id):
    for tag in tags.find_all("div"):

        if tag is None:
            continue

        if tag.get('id') == f'{id}':
            divContent = tag
            return divContent

def main():
    url: str = "https://www.meutimao.com.br/tabela-de-classificacao/campeonato_brasileiro/"

    responseResearch = requests.get(url).content
    soup = BeautifulSoup(responseResearch, 'html.parser')
    divId = 'conteudo'

    tableDiv = findDivById(soup, divId)

#tableDiv contém toda a tabela de classificação do campeonato blasileiro

main()