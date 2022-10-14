import json
from django.http import JsonResponse
from .api import get_similar_bands, get_bands_id_from_deezer, get_music_url
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def bands(request):
    body = json.loads(request.read().decode("utf-8"))
    if request.method == "POST":
        if body.get("band"):
            band = body['band']
            response = get_bands_id_from_deezer(get_similar_bands(band))
            return JsonResponse(response, safe=False)
        elif body.get("query"):
            query = body['query']
            response = get_music_url(query)
            return JsonResponse(response, safe=False)
    return None