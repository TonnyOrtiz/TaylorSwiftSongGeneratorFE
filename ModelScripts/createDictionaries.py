import json

# Ruta del archivo
choruses_file = 'choruses.txt'

# Leer el archivo y construir el vocabulario
with open(choruses_file, 'r', encoding='utf-8') as f:
    text = f.read()

# Crear vocabulario único
vocab = sorted(set(text))  # Conjunto de caracteres únicos ordenados

# Generar mapeos
char2idx = {char: idx for idx, char in enumerate(vocab)}
idx2char = {idx: char for idx, char in enumerate(vocab)}

# Guardar los mapeos como JSON
with open('char2idx.json', 'w', encoding='utf-8') as f:
    json.dump(char2idx, f, ensure_ascii=False, indent=2)

with open('idx2char.json', 'w', encoding='utf-8') as f:
    json.dump(idx2char, f, ensure_ascii=False, indent=2)

print("Mapeos generados y guardados en char2idx.json e idx2char.json.")
