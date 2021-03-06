﻿/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {AppRegistry, SectionList, Image, View, StyleSheet ,Text, Console, TouchableOpacity} from 'react-native';


export default class App extends Component {
    constructor(){
        super();
        this.state = {
            resultText : "",
            calculationText : ""
        };
        this.operation = ['DEL', '+','-','*','/']
    }
    
    calculateResult(){
        const text = this.state.resultText

        console.log(text, eval(text))

        this.setState({
            calculationText : eval(text)
        })
    }

    operate(operation){
        switch(operation){
            case 'DEL':
                console.log(this.state.resultText)
                let text = this.state.resultText.split('')
                text.pop()
                this.setState({
                    resultText : text.join('')
                })
                break
            case '+':
            case '-':
            case '*':
            case '/':

                const lastChar = this.state.resultText.split('').pop()
                if(this.operation.indexOf(lastChar) > 0  ) return
                this.setState({
                    resultText : this.state.resultText+operation
                })
        }
    }

    validate(){
        const text = this.state.resultText

        switch (text) {
            case '+':
            case '-':
            case '*':
            case '/':

                return false
        }
        return true
    }

    buttonPressed(text){
        console.log(text)
        
        if(text == '='){
            return this.validate() && this.calculateResult()
        }
        
        this.setState({
            resultText:  this.state.resultText+text
        })
    }

    render() {
        let rows = []
        let nums = [[1,2,3],[4,5,6],[7,8,9],['.',0,'=']]
        for(let i = 0; i<4; i++){
            let row = []
            for(let j = 0; j<3; j++){
                row.push(<TouchableOpacity key={nums[i][j]} onPress={()=>this.buttonPressed(nums[i][j])} style={styles.btn}>
                    <Text style={styles.btnText}>{nums[i][j]}</Text>
                </TouchableOpacity>)
            }
            rows.push(<View key={i} style={styles.row}>{row}</View>)
        }

        let ops = []
        for(let i = 0; i < 5; i++){
            ops.push(<TouchableOpacity keys={this.operation[i]}onPress={()=>this.operate(this.operation[i])} style={styles.btn}>
                <Text style={styles.operationText}>{this.operation[i]}</Text>
            </TouchableOpacity>)
        }

        return (

            <View style={styles.container}>
                <View style={styles.result}>
                    <Text style={styles.resultText}> {this.state.resultText}</Text>
                </View>
                <View style={styles.calc}>
                    <Text style={styles.calcText}> {this.state.calculationText}</Text>
                </View>
                <View style={styles.button}>
                    <View style={styles.number}>
                        {rows}
                    </View>
                    <View style={styles.operation}>
                        {ops}
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    btn :{
        flex : 1,
        alignItems : 'center',
        alignSelf : 'stretch',
        justifyContent : 'center'
    },
    btnText:{
      fontSize : 30,
        color : 'white'
    },
    operationText : {
      fontSize : 40,
      color : 'white'
    },
    row:{
        flexDirection: 'row',
        flex:1,
        justifyContent:'space-around',
        alignItems:'center'
    },
    calc: {
        flex: 1,
        backgroundColor : 'white',
        alignItems:'flex-end',
        justifyContent : 'center'
    },
    calcText:{
        fontSize : 40,
        color : 'black'
    },
    result: {
        flex: 2,
        backgroundColor : 'white',
        alignItems:'flex-end',
        justifyContent : 'center'
    },
    resultText: {
        fontSize : 30,
        color : 'black'
    },
    button: {
        flexGrow: 7,
        flexDirection : 'row',
    },
    number: {
        flexGrow: 3,
        backgroundColor : '#444'
    },
    operation: {
        flex: 1,
        justifyContent:'space-around',
        backgroundColor : '#636363',
        alignItems:'stretch'
    },
})

