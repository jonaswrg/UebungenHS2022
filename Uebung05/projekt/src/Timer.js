import React, {Component} from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

var count = ""

class Timer extends Component {
    constructor(props) {
        super(props);

        this.state = {count: this.props.countdown, msg: "", render: true};
        this.interval = null;

        // Event-Handler registrieren:
        this.update = this.update.bind(this);
        this.start_timer = this.start_timer.bind(this);
        this.setTimer = this.setTimer.bind(this);
    }

    setTimer (event) {
        const sek = event.target.value;
        this.setState({count: sek})
    }


    update(event) {
        this.setState({ count: this.state.count - 1 });
        if (this.state.count <= 1) {
            this.setState({count: "", msg: "FERTIG", render: true});
            clearInterval(this.interval);
            this.interval = null;
        }
    }

    start_timer(event) {
        this.setState({msg: ""});
        this.setState({render: false})
        if (this.interval != null)
        {
            clearInterval(this.interval);
        }
        this.interval = setInterval(this.update, 1000);
    }


    render() {
        return (
        <>
            {this.state.render &&
            <Grid container>
                <Grid style={{margin: 24}}>
                    <TextField inputProps={{type: "number"}} value={this.state.countdown} onChange={this.setTimer} label="Sekunden"/>
                </Grid>
            </Grid>}
            <p>{this.state.count}</p>
            <p>{this.state.msg}</p>
            <Button variant="contained" onClick={this.start_timer}>Start</Button>
        </>)
    }
}

export default Timer;