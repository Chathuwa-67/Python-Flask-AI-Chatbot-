# Python-Flask-AI-Chatbot
# Chatbot Deployment with Flask and JavaScript

 
Clone repo and create a virtual environment
```
clone the repo
$ cd chatbot-deployment
$ python -m venv venv
$ . venv/script/activate
```
Install dependencies
```
$ (venv) pip install Flask torch torchvision nltk
```
Install nltk package
```
$ (venv) python
>>> import nltk
>>> nltk.download('punkt')
```
Modify `intents.json` with different intents and responses for your Chatbot

Run
```
$ (venv) python train.py
```
This will dump data.pth file. And then run
the following command to test it in the console.
```
$ (venv) python chat.py
```

 

 
