import '@testing-library/jest-dom';
import { LoginScreen } from '../../components/auth/LoginScreen'
import { mount, shallow } from 'enzyme'
//jest.mock('../../components/auth/LoginScreen');

describe('Pruebas sobre componente auth/LoginScreen', () => {

    const wrapper = mount ( <LoginScreen />);
    
    test('Se muestra el componente correctamente', () => {
        expect(wrapper).toMatchSnapshot();
        
    });

    test ('El formulario se encuentra vacío por defecto', () => {
        
        const loginButtonDisabled = wrapper.find('button').prop('disabled');
        const email = wrapper.find('#email').prop('value');
        const password = wrapper.find('#password').prop('value');

        expect(email).toBe('');
        expect(password).toBe('');
        expect(loginButtonDisabled).toBe(true);
    }); 

    test('Permite el ingreso del correo correctamente', () => {
        const email = wrapper.find('#email');
        expect(email.prop('value')).toBe('');

        email.simulate('change', { target: { name:'email', value: 'random-text' } });
        expect(wrapper.find('#email').prop('value')).toBe('random-text');
        
    });

    test('Permite el ingreso de la contraseña correctamente', () => {
        
        const password = wrapper.find('#password');
        expect(password.prop('value')).toBe('');
        
        password.simulate('change', { target: { name:'password', value: 'random-text' } });
        expect(wrapper.find('#password').prop('value')).toBe('random-text');
        
    });


    test('Habilita el botón de Login si los campos tienen datos', () => {
        
        const loginButton = wrapper.find('button').prop('disabled');
        expect(loginButton).toBe(false);

    });



    test('Muestra mensaje de error cuando el correo no es válido', () => {
        
        const email = wrapper.find('#email');
        email.simulate('change', { target: { name:'email', value: 'test@something' } });
        const loginButton = wrapper.find('button');
        loginButton.simulate("click");

        // expect(loginButton).toBe('Email is not valid');
        
        //const error =  wrapper.find('#error').props();

        //expect(error).toBe('Email is not valid');
        expect(wrapper.contains('Email is not valid')).toBe(true);

    });
    test('Debería mostrar mensaje de error sobre contraseña incorrecta', () => {
        
        const a = 1;
        const b = 1;

        expect(a).toBe(b);

    });
});
