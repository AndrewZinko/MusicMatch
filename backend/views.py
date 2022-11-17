import json
from django.http import JsonResponse
from .api import get_similar_bands, get_bands_music_from_deezer, get_music_url
from django.views.decorators.csrf import csrf_exempt

def request_processing(request):
    if request.method == "POST":
        body = json.loads(request.read().decode("utf-8"))
        value = ""

        for key in body.keys():
            value = body[key]
            break

        return value
    return {}

@csrf_exempt
def bands(request):
    query = request_processing(request)
    if query != {}:
        response = get_bands_music_from_deezer(get_similar_bands(query))
        return JsonResponse(response, safe=False)
    return JsonResponse({}, safe=False)

@csrf_exempt
def music_url(request):
    query = request_processing(request)
    if query != {}:
        response = get_music_url(query)
        return JsonResponse(response, safe=False)
    return JsonResponse({}, safe=False)