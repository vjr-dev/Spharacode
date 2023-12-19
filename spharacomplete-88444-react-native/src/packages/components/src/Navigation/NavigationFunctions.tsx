export const NavigateAfterSignUp = (props: any) => {
    props.navigation.replace('AuthoriseStack', { screen: 'ThankyouScreen' });
}

export const GotoHomePage = (props: any) => {
    props.navigation.replace('AuthoriseStack', { screen: 'HomePage' });
}

export const GotoPersonalInformationPage = (props: any) => {
    props.navigation.replace('AuthoriseStack', { screen: 'PersonalInformation', params:{from:"loginFlow"}});
}

export const GotoEmergencyContactPage = (props: any) => {
    props.navigation.replace('AuthoriseStack', { screen: 'EmergencyContact' });
}

export const GotoFirstResponderHomePage = (props: any) => {
    props.navigation.replace('AuthoriseStackFirstResponder', { screen: 'FirstResponderHomePage' });
}

export const NavigateAfterSignUpFirstResponder = (props: any) => {
    props.navigation.replace('AuthoriseStackFirstResponder', { screen: 'ThankyouScreen' });
}
export const GotoFirstResponderPersonalInformationPage = (props: any) => {
    props.navigation.replace('AuthoriseStackFirstResponder', { screen: 'PersonalInformation', params:{from: ""}});
}

export const GotoFirstResponderAuthenticationPage = (props: any) => {
    props.navigation.replace('AuthoriseStackFirstResponder', { screen: 'Authentication'});
}

export const GotoFirstResponderIdentificationPage = (props: any) => {
    props.navigation.replace('AuthoriseStackFirstResponder', { screen: 'IdentificationScreen'});
}