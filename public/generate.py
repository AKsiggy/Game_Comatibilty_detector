import requests

response = requests.post(
    f"https://api.stability.ai/v2beta/stable-image/generate/sd3",
    headers={
        "authorization": f"STABILITY_API_KEY",
        "accept": "image/*"
    },
    files={"none": ''},
    data={
        "prompt": "cool cyborg samurai in a cyberpunk dystopia",
        "output_format": "jpeg",
    },
)

if response.status_code == 200:
    with open("./gen_img1.jpeg", 'wb') as file:
        file.write(response.content)
else:
    raise Exception(str(response.json()))