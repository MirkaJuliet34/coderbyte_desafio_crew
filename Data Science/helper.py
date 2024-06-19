import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler
from keras.models import Sequential
from keras.layers import LSTM, Dense, Dropout

# Função fornecida para criar o dataset
def create_dataset(df):
    x, y = [], []
    for i in range(50, df.shape[0]):
        x.append(df[i-50:i, 0])
        y.append(df[i, 0])
    x = np.array(x)
    y = np.array(y)
    return x, y

# Carregar o dataset
df = pd.read_csv('TSLA.csv')
df = df['Open'].values
df = df.reshape(-1, 1)

# Configurar os datasets de treino e teste
dataset_train = np.array(df[:int(df.shape[0]*0.8)])
dataset_test = np.array(df[int(df.shape[0]*0.8):])

# Escalar os valores
scaler = MinMaxScaler(feature_range=(0, 1))
dataset_train = scaler.fit_transform(dataset_train)
dataset_test = scaler.transform(dataset_test)

# Criar os datasets de treino e teste usando a função 'create_dataset'
x_train, y_train = create_dataset(dataset_train)
x_test, y_test = create_dataset(dataset_test)

# Redimensionar os datasets 'x_train' e 'x_test'
x_train = np.reshape(x_train, (x_train.shape[0], x_train.shape[1], 1))
x_test = np.reshape(x_test, (x_test.shape[0], x_test.shape[1], 1))

# Implementar o modelo Sequencial
model = Sequential()

# Primeira camada LSTM com Dropout
model.add(LSTM(units=4, input_shape=(x_train.shape[1], 1), return_sequences=True))
model.add(Dropout(0.2))

# Segunda camada LSTM com Dropout
model.add(LSTM(units=4))
model.add(Dropout(0.2))

# Camada final Densa
model.add(Dense(units=1))

# Compilar o modelo
model.compile(optimizer='adam', loss='mean_squared_error')

# Treinar o modelo
model.fit(x_train, y_train, epochs=5, batch_size=16, verbose=0)

# Prever os valores para 'x_test'
predictions = model.predict(x_test)

# Imprimir a última coluna da matriz de previsões
print(predictions[:, -1])

# Imprimir o resumo do modelo
model.summary()