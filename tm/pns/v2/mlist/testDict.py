import os

with open('ya.py', 'r', encoding='utf-8') as f:
  a = eval(f.read())

for i in a:
  print(i, a[i])