<h1 align="center">
📱Projeto de Tela de Bloqueio do iOS 16
</h1>

<p align="center">
  ✨Construindo a tela de bloqueio do iOS 16 em React Native.✨
</p>

<div align="center">
<img src="https://github.com/MirkaJuliet34/coderbyte_desafio_crew/issues/1#issue-2362983654" />
</div>


#


# Tecnologias utilizadas

- JavaScript 
- CSS 
- DayJs 
- React Native 
- React-Native-Gesture-Handler 
- React-Native-Reanimated 

# Detalhes

## App.js


- GestureHandlerRootView - Essa biblioteca foi utilizada como uma maneifra de usar o sistema de manipulação de toque nativo (pinça, rotação e panorâmica).

* Definir relações entre manipuladores.
* ScrollViews - permitir a paginação pelas visualizações usando gestos de deslizamento usando os acessórios pagingEnabled.
* Mecanismos que utilizam touchables que rodam em thread nativo e seguem o comportamento padrão da plataforma.
* A possibilidade de implementar interações de gestos suaves graças ao Animated Native Driver e continuaram responsivas mesmo quando o thread JS estiver sobrecarregado.

 - O React Native Gesture Handler foi utilizado para gerenciar os gestos nativos para criar as melhores experiências baseadas em toque possíveis no React Native. 

 - Parallax  - Torna a aplicação mais funcional.

 - GestureHandlerRootView - Fornecer mais controle sobre os componentes nativos integrados que podem lidar com gestos.

 #

 ## LockScreen.js


* useState - Controlar o estado das horas.

* useEffect - Efeitos na função hora. 

* useMemo - Retornando o valor de uma função (Data / Hora).

* Day.js - Para analisar, validar e manipular data.

* ImageBackground - Usado na tela inicial, pelo de poder colocar quaisquer filhos em cima dele. 

* AnimatedBlurView - No iOS, ele renderiza uma visualização de desfoque nativa. No Android, ele volta para uma visão semitransparente.

* animatedProps - Animar propriedades de algum componente nativo de terceiros, já que a maioria das propriedades para os componentes principais do React Native fazem parte dos estilos de qualquer maneira (pelo menos as propriedades para as quais faz sentido para ser animado).

* homeScreenBlur - Função de desfocar.

* SwipeUpToOpen - Deslizar

#


## Install dayjs

```
npx expo install dayjs
```

## Import

```
import dayjs from "dayjs";
```
## Display Current Date (Exibir data Atual)

To display the date, we can use `dayjs().format("dddd, DD MMMM")`

To display the time, we can use `dayjs().format("hh:mm")`

Com essas alterações, os textos devem ser:

```
<Text style={styles.date}>{dayjs().format("dddd, DD MMMM")}</Text>
<Text style={styles.time}>{dayjs().format("hh:mm")}</Text>
```

## Update date&time (Atualizar Data e Hora)


## Import

```
import { useState, useEffect } from "react";
```

Armazena a data atual em uma variável de estado e usar a variável de estado para renderizar na tela.

```const [date, setDate] = useState(dayjs());

<Text style={styles.date}>{dayjs().format("dddd, DD MMMM")}</Text>
<Text style={styles.time}>{dayjs().format("hh:mm")}</Text>

<Text style={styles.date}>{date.format("dddd, DD MMMM")}</Text>
<Text style={styles.time}>{date.format("hh:mm")}</Text>
```

Por fim, precisamos atualizar a variável de estado para refletir a hora atual


```
useEffect(() => {
  let timer = setInterval(() => {
    setDate(dayjs());
  }, 1000 * 1);

  return () => clearInterval(timer);
}, []);
```

#

## Notification FlatList
## Add the NotificationItem component (Adicione o componente NotificationItem)

Crie um novo arquivo em src/components/NotificationItem.js e adicione o próximo código.

```
import { FlatList, useWindowDimensions } from "react-native";

import notifications from "../../assets/data/notifications";

import NotificationItem from "./NotificationItem";

const NotificationsList = ({ ...flatListProps }) => {
  const { height } = useWindowDimensions();

  return (
    <FlatList
      data={notifications}
      renderItem={({ item, index }) => (
        <NotificationItem
          data={item}
          index={index}
        />
      )}
      {...flatListProps}
    />
  );
};

export default NotificationsList;
```


##  Render it from App.js (Renderize a partir do App.js)

Primeiro importe a lista

```
import NotificationsList from "./src/components/NotificationsList";
```
E então, renderize entre o cabeçalho e o rodapé


```
<NotificationsList />
```
Mova o cabeçalho como o *ListHeaderComponent* da nossa *NotificationsList*



```java
<NotificationsList
  ListHeaderComponent={() => (
    <View style={styles.header}>
      <Ionicons name="ios-lock-closed" size={24} color="white" />

      <Text style={styles.date}>{date.format("dddd, DD MMMM")}</Text>
      <Text style={styles.time}>{date.format("hh:mm")}</Text>
    </View>
  )}
/>
```
## Get started with Reanimated(Comece com o Reanimado)
### Steps (Passos)

```
npx expo install react-native-reanimated
```
Em todos os casos, após a conclusão da instalação, você também deve adicionar o plug-in do Babel ao babel.config.js:

```
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['react-native-reanimated/plugin'],
  };
};
```

Iniciar e limpar o cache

```
npm start -- --clear
```

## Layout Animations (Animações de layout)

```
<Animated.View entering={SlideInUp} style={styles.header}>

<Animated.View entering={SlideInDown} style={styles.footer}>
```

### Custom animations (Animações personalizadas)

Adicione o texto "Deslize para cima para abrir" e, em seguida, vamos animar sua posição e opacidade.

```
const animatedStyles = useAnimatedStyle(() => ({
  transform: [
    {
      translateY: withRepeat(
        withSequence(
          withTiming(-10),
          withDelay(1500, withTiming(0)),
          withTiming(-15)
        ),
        -1
      ),
    },
  ],
  opacity: withRepeat(
    withSequence(
      withDelay(1500, withTiming(0)),
      withDelay(300, withTiming(1))
    ),
    -1
  ),
}));
```

## Image Background (Plano de fundo da imagem)

### Import

```
import { ImageBackground } from "react-native";
import wallpaper from "./assets/images/wallpaper.webp";
```
### Render

```
...

<ImageBackground source={wallpaper} style={StyleSheet.absoluteFill}>

</ImageBackground>
```

### Light status bar


```
<StatusBar style="light" />
```
## Data and time UI (IU de dados e hora)

### Render

```
<View style={styles.header}>
  <Ionicons name="ios-lock-closed" size={24} color="white" />

  <Text style={styles.date}>Friday, 30 September</Text>
  <Text style={styles.time}>12:03</Text>
</View>
```



