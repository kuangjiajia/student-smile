import React, { Component } from 'react'
import { connect } from 'react-redux'
import { add } from '../../reducer/count/action.js'

class Count extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() { 
        return (
            <div>
                <span>{this.props.num}</span>
                <button onClick={this.props.clickToChange}>点我改变</button>
            </div>
        )
    }
}


const mapStateToProps = (state,ownProps) => {
    console.log(state)
    return {
        num: state.Counter
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        clickToChange: () => {
            dispatch(add())
        }
    }
}

 
export default connect(mapStateToProps,mapDispatchToProps)(Count)
