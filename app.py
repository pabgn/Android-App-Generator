#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import Flask, render_template, request, url_for 
app = Flask(__name__)
objects = [('Layouts', ['LinearLayout', 'AbsoluteLayout', 'RelativeLayout']), ('Buttons', ['Button', 'Label'])]

@app.route('/')
def index():
	return render_template('index.html', objects=objects)
	
if __name__ == "__main__":
	app.run(host='0.0.0.0', port=3434)