import React,{ Component, Fragment} from 'react';
import headerCSS from './Header.css'
import dictionary from '../../context/tflDictionary';
import Button from '../Button/Button';
import Modal from '../UI/Modal/Modal';
import Login from '../Authenticate/Login/Login';
import Logo from '../Logo/Logo';
import ProfileOption from '../Profile/ProfileOptions/ProfileOptions';

class Header extends Component{
    static contextType = dictionary;

    state={
        isAuth:false,
        showLoginPopup:false,
    };

    showLoginPopup = () =>{
        this.setState({showLoginPopup: true});
    }

    hideLoginPopup = () =>{
        this.setState({showLoginPopup: false});
    }
    authenticate = () =>{
        this.setState({isAuth:true,showLoginPopup: false});
    }
    logout = () =>{
        this.setState({isAuth:false});
        
    }
    render(){
        let loginBtn = <Button btnType="button" 
                            styleClass={headerCSS.loginButton}
                            clickEvent={this.showLoginPopup}>
                            <label>{this.context.loginLabel}</label>
                        </Button>;
        let account = <Button btnType="button" 
                        styleClass={headerCSS.signupButton}>
                        <label>{this.context.signUpLabel}</label>
                    </Button>;
        if(this.state.isAuth){
            loginBtn = <Button btnType="button" 
                        styleClass={headerCSS.tryPremiumButton}>
                        <label>{this.context.tryPremiumLabel}</label>
                    </Button>;
            account= <ProfileOption UserName={this.context.FieldList[1].value} logoutEvent={this.logout}/>;
        }
        return(
            <Fragment>
                <Modal show={this.state.showLoginPopup} clickEvent={this.hideLoginPopup}>
                    <Login loginEvent={this.authenticate}/>
                </Modal>
                <div className={headerCSS.HeaderContainer}>
                    <Logo PanelClass={headerCSS.LogoPanel} LogoClass={headerCSS.Logo} />
                    <div className={headerCSS.ContentPanel}>
                        
                    </div>
                    <div className={headerCSS.MenuPanel}>
                            <h5 className={headerCSS.Explore}>{this.context.exploreLabel}</h5>
                        {loginBtn}
                    </div>
                    <div className={headerCSS.LoginPanel}>
                        {account}
                    </div>
                </div>
                <hr/>
            </Fragment>
        );
    }
};

export default Header;