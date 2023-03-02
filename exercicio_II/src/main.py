import re
import requests
import requests_cache
from bs4 import BeautifulSoup

linksVisitados = []
index = 0
requests_cache.install_cache('myCache')
url = "https://www.bbc.com/portuguese"
class BancoDeDados:
    # urlDoSite: str
    # numeroDeTermos: int
    # numeroDeLinks: int
    # pontuacao: int
    def __init__(self, urlDoSite):
        self.urlDoSite = urlDoSite
        self.numeroDeTermos = []
        self.numeroDeLinks = []
        self.numeroDeReferencias: int = 0
        self.pontuacao = 0

    def calcularPontuacao(self):
        self.pontuacao = (
            (self.numeroDeReferencias * 2) +
            (len(self.numeroDeTermos) * 2) -
            (len(self.numeroDeLinks))
        )
        return self.pontuacao
        
arrayDeDados: BancoDeDados = []

def isNotHTTP(link: str):
    if link.find('http') is None and link.find('https') is None:
        return True


def pegarCadeiaDeCaracteres(match, texto: str):
    cadeia = ''
    distancia = 20
    for word in range(match.start() - distancia, match.end() + distancia):
        if texto[word] == '\n' or texto[word] == '\r':
            continue
        elif texto[word] + texto[word+1] == '  ':
            continue
        cadeia += texto[word]
    return cadeia
    # texto[posicao - 20 : posicao] + palavra_chave + texto[posicao + len(palavra_chave) : posicao + len(palavra_chave) + 20]

def printBancoDeDados(
    url: str, numeroDeTermos: int, numeroDeLinks: int, numeroDeReferencias: int, pontuacao: int
    ):
    print(
            f"A URL do site é:{url}\n"
            f"O número de termos:{numeroDeTermos}\n"
            f"O número de links:{numeroDeLinks}\n"
            f"O número de referencias:{numeroDeReferencias}\n"
            f"O número de pontos:{pontuacao}\n"
        )

def tratarLink(link: str):
    if link[0] == '#':
        return url
    elif link[0] == "/":
        return url + link[1 : ]
    else:
        return link


def search(key: str, url: str, depth: int):
    myBancoDeDados = BancoDeDados(url)

    response = requests.get(url, verify=True)

    soup = BeautifulSoup(response.content, 'html.parser')

    text = soup.get_text()

    termosEncontrados = []

    for occurences in re.finditer(key, text):
        termosEncontrados.append(
            pegarCadeiaDeCaracteres(occurences, text)
        )
    
    myBancoDeDados.numeroDeTermos = termosEncontrados
    
    linksEncontrados = []
    numeroDeReferencias = 0


    for links in soup.find_all('a'):

        link = links.get('href')
        
        if link is None or link == '':
            continue

        novoLink = tratarLink(link)


        linksEncontrados.append(novoLink)

    for link in linksEncontrados:
        
        if link in linksVisitados:
            numeroDeReferencias += 1

        if depth > 0:
        
            if link not in linksVisitados:
                search(key, link, depth - 1)
    myBancoDeDados.numeroDeLinks = linksEncontrados
    myBancoDeDados.numeroDeReferencias = numeroDeReferencias

    # if url not in linksVisitados:
    #     myBancoDeDados.numeroDeTermos = termosEncontrados

    # print(f'A url era: {url}')
    # print(f'Os links encontrados foram: {linksEncontrados}')
    # print(f'Os links visitados foram: {linksVisitados}')
    # printBancoDeDados(
    #     myBancoDeDados.urlDoSite, len(myBancoDeDados.numeroDeTermos), 
    #     len(myBancoDeDados.numeroDeLinks), myBancoDeDados.numeroDeReferencias,
    #     myBancoDeDados.calcularPontuacao()
    # )
    linksVisitados.append(url)

    arrayDeDados.append(myBancoDeDados)

def main():
    search('news', url, 1)

    newArrayDeDados = sorted(arrayDeDados, key= lambda dado : dado.calcularPontuacao(), reverse= True)
    
    for dados in newArrayDeDados:

        printBancoDeDados(
            dados.urlDoSite, len(dados.numeroDeTermos), 
            len(dados.numeroDeLinks), dados.numeroDeReferencias,
            dados.calcularPontuacao()
        )

main()