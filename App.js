import React, { Component } from 'react';
import {
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alcool: '',
      gasolina: '',
      resultado: '',
    };

    this.calcular = this.calcular.bind(this);
  }

  calcular() {
    if (this.state.alcool === null || this.state.alcool === '') {
      return this.setState({resultado: 'Informe um valor do álcool!'});
    }
    if (this.state.gasolina === null || this.state.gasolina === '') {
      return this.setState({resultado: 'Informe um valor da gasolina!'});
    }
    if (isNaN(this.state.alcool) || isNaN(this.state.gasolina)) {
      return this.setState({resultado: 'Informe um valor correto!'});
    }

    let valorGasolina = parseFloat(this.state.gasolina);
    if (valorGasolina === 0) {
      this.setState({resultado: 'O preço da gasolina não pode ser zero!'});
    } else {
      let valorAlcool = parseFloat(this.state.alcool);
      let result = valorAlcool / valorGasolina < 0.7;

      if (result) {
        this.setState({
          alcool: '',
          gasolina: '',
          resultado: 'Compensa usar Álcool!',
        });
      } else {
        this.setState({
          alcool: '',
          gasolina: '',
          resultado: 'Compensa usar Gasolina!',
        });
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require('./img/gas.jpg')} />
        <Text style={styles.title}> Qual a melhor opção? </Text>
        <TextInput
          keyboardType="numeric"
          ref={this.state.alcool}
          placeholder="Álcool (preço por litro) ex: 1.55"
          style={styles.inputStyle}
          onChangeText={inputAlcool => this.setState({alcool: inputAlcool})}
          defaultValue={this.state.alcool}
        />
        <TextInput
          keyboardType="numeric"
          ref={this.state.gasolina}
          placeholder="Gasolina (preço por litro) ex: 2.25"
          style={styles.inputStyle}
          onChangeText={inputGasolina =>
            this.setState({gasolina: inputGasolina})
          }
          defaultValue={this.state.gasolina}
        />
        <View style={styles.btnArea}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              Keyboard.dismiss();
              this.calcular();
            }}>
            <Text style={styles.btnTexto}>Calcular</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.textResult}> {this.state.resultado} </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A89F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  logo: {
    resizeMode: 'contain',
    height: 200,
    width: 200,
    borderRadius: 5,
    marginBottom: 15,
  },
  inputStyle: {
    marginTop: 20,
    width: 300,
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 50,
    backgroundColor: '#fff',
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFF',
    height: 50,
    margin: 50,
    borderRadius: 10,
  },
  btnArea: {
    flexDirection: 'row',
    height: 40,
    marginTop: -25,
    marginBottom: 150,
  },
  btnTexto: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A89F7',
    textAlign: 'center',
  },
  textResult: {
    marginLeft: 25,
    marginRight: 25,
    fontSize: 24,
    fontWeight: 'normal',
    color: '#fff',
  },
});

export default App;
