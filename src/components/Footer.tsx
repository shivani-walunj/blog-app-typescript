import React, { Component } from 'react';

class Footer extends Component<{}> {
    render() {
        const today = new Date();
        return (
            <footer className='Footer'>
                <p>Copyright &copy; {today.getFullYear()}</p>
            </footer>
        );
    }
}

export default Footer;
