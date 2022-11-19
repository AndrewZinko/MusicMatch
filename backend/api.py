import requests
from pytube import Search
from bs4 import BeautifulSoup as soup
from urllib.request import urlopen, Request
import urllib.parse
from urllib.error import HTTPError, URLError


def get_similar_bands(band_name):
    url = Request(f"https://www.music-map.com/{urllib.parse.quote(band_name)}", headers={'User-Agent': 'Mozilla/5.0'})
    try:
        content = soup(urlopen(url).read(), features="lxml")
        group_array = []

        for link in content.find_all(name="a", attrs={'class': 'S'}):
            group_array.append(link.text)

        group_array.pop(0)
        return group_array
    except HTTPError:
        return None


def get_bands_music_from_deezer(list_of_bands):

    if list_of_bands == None:
        return list_of_bands

    url = "https://deezerdevs-deezer.p.rapidapi.com/search"

    headers = {
        "X-RapidAPI-Key": "515617e782mshaa96d7c8d2b59bep172151jsn374a19122be2",
        "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com"
    }

    response_array = []
    band_list_name = []
    bands_list_music = [[], [], [], [], []]

    for group in list_of_bands:
        response = requests.request("GET", url, headers=headers, params={"q": f"{group}"})

        if (response.json()).get('data'):
            response_array.append(response.json()["data"])
            band_list_name.append(group)

        if len(response_array) == 5:
            break

    for i in range(0, 5):
        for band_data in response_array:
            for track in band_data:
                if track["artist"]["name"] == band_list_name[i]:
                    bands_list_music[i].append(track)

    return bands_list_music


def get_music_url(query):
    search_result = Search(query)

    for video in search_result.results:
        url = video.streams.filter(only_audio=True).order_by("abr").desc().first().url
        try:
            if urlopen(Request(url)).code == 200:
                return {
                    "musicUrl": url
                }
            else:
                continue
        except HTTPError or URLError:
            continue
