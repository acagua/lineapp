import { types } from "../types/types";

const initState={
    companies:[
        {
            id: '123',
            name:'Bancolombia',
            branches: [
                {
                    id: '456',
                    name:'CL 122',
                    address:'CL 123 45 67',
                    latitude:'',
                    longitude:'',
                    openHours: [
                        {
                            day: 0,
                            startHour: '08:00', // TODO pasar a Date()
                            endHour: '19:00',
                        },
                        {
                            day: 1,
                            startHour: '08:00', // TODO pasar a Date()
                            endHour: '19:00',
                        },
                        {
                            day: 2,
                            startHour: '08:00', // TODO pasar a Date()
                            endHour: '19:00',
                        },
                        {
                            day: 3,
                            startHour: '08:00', // TODO pasar a Date()
                            endHour: '19:00',
                        },
                        {
                            day: 4,
                            startHour: '08:00', // TODO pasar a Date()
                            endHour: '19:00',
                        },
                        {
                            day: 5,
                            startHour: '8:00', // TODO pasar a Date()
                            endHour: '12:00',
                        },
                        {
                            day: 6,
                            startHour: false, // TODO pasar a Date()
                            endHour: false,
                        },
                    ],
                    services: [
                        {
                            id:'789',
                            name:'Cashier',
                            minutesPerUser:'10',
                            nextInLineTime:'', // personas x averageTime // un arreglo de los usuarios en fila?
                            attendingResources: 4,
                            usersInLine:[ 
                                {
                                    id: 'u1',
                                },
                                {
                                    id: 'u2',
                                },
                                {
                                    id: 'u3',
                                },
                            ],
                        },
                        {
                            id:'s2',
                            name:'Advisory',
                            minutesPerUser:'25',
                            nextInLineTime:'', // personas x averageTime // un arreglo de los usuarios en fila?
                            attendingResources: 4,
                            usersInLine:[ 
                                {
                                    id: 'u1',
                                },
                                {
                                    id: 'u2',
                                },
                                {
                                    id: 'u3',
                                },
                            ],
                        },
                    ]
                },
                {
                    id: 'b2',
                    name:'Unicentro piso 2',
                    address:'CL 123 45 67',
                    latitude:'',
                    longitude:'',
                    openHours: [
                        {
                            day: 0,
                            startHour: '08:00', // TODO pasar a Date()
                            endHour: '19:00',
                        },
                        {
                            day: 1,
                            startHour: '08:00', // TODO pasar a Date()
                            endHour: '19:00',
                        },
                        {
                            day: 2,
                            startHour: '08:00', // TODO pasar a Date()
                            endHour: '19:00',
                        },
                        {
                            day: 3,
                            startHour: '08:00', // TODO pasar a Date()
                            endHour: '19:00',
                        },
                        {
                            day: 4,
                            startHour: '08:00', // TODO pasar a Date()
                            endHour: '19:00',
                        },
                        {
                            day: 5,
                            startHour: '8:00', // TODO pasar a Date()
                            endHour: '12:00',
                        },
                        {
                            day: 6,
                            startHour: false, // TODO pasar a Date()
                            endHour: false,
                        },
                    ],
                    services: [
                        {
                            id:'s1',
                            name:'Caja',
                            minutesPerUser:'10',
                            nextInLineTime:'', // personas x averageTime // un arreglo de los usuarios en fila?
                            attendingResources: 4,
                            usersInLine:[ 
                                {
                                    id: 'u1',
                                },
                                {
                                    id: 'u2',
                                },
                                {
                                    id: 'u3',
                                },
                            ],
                        },
                        {
                            id:'s2',
                            name:'Asesorías',
                            minutesPerUser:'10',
                            nextInLineTime:'', // personas x averageTime // un arreglo de los usuarios en fila?
                            attendingResources: 4,
                            usersInLine:[ 
                                {
                                    id: 'u1',
                                },
                                {
                                    id: 'u2',
                                },
                                {
                                    id: 'u3',
                                },
                            ],
                        },
                        {
                            id:'s3',
                            name:'Empresas',
                            minutesPerUser:'10',
                            nextInLineTime:'', // personas x averageTime // un arreglo de los usuarios en fila?
                            attendingResources: 4,
                            usersInLine:[ 
                                {
                                    id: 'u1',
                                },
                                {
                                    id: 'u2',
                                },
                                {
                                    id: 'u3',
                                },
                            ],
                        },
                    ]
                },
            ],
        },
        {
            id: 'c2',
            name:'Avianca',
            branches: [
                {
                    id: 'b1',
                    name:'Unicentro',
                    address:'CL 123 45 67',
                    latitude:'',
                    longitude:'',
                    openHours: [
                        {
                            day: 0,
                            startHour: '08:00', // TODO pasar a Date()
                            endHour: '19:00',
                        },
                        {
                            day: 1,
                            startHour: '08:00', // TODO pasar a Date()
                            endHour: '19:00',
                        },
                        {
                            day: 2,
                            startHour: '08:00', // TODO pasar a Date()
                            endHour: '19:00',
                        },
                        {
                            day: 3,
                            startHour: '08:00', // TODO pasar a Date()
                            endHour: '19:00',
                        },
                        {
                            day: 4,
                            startHour: '08:00', // TODO pasar a Date()
                            endHour: '19:00',
                        },
                        {
                            day: 5,
                            startHour: '8:00', // TODO pasar a Date()
                            endHour: '12:00',
                        },
                        {
                            day: 6,
                            startHour: false, // TODO pasar a Date()
                            endHour: false,
                        },
                    ],
                    services: [
                        {
                            id:'s1',
                            minutesPerUser:'10',
                            nextInLineTime:'', // personas x averageTime // un arreglo de los usuarios en fila?
                            attendingResources: 4,
                            usersInLine:[ 
                                {
                                    id: 'u1',
                                },
                                {
                                    id: 'u2',
                                },
                                {
                                    id: 'u3',
                                },
                            ],
                        },
                    ]
                },
                {
                    id: 'b2',
                    name:'Unicentro piso 2',
                    address:'CL 123 45 67',
                    latitude:'',
                    longitude:'',
                    openHours: [
                        {
                            day: 0,
                            startHour: '08:00', // TODO pasar a Date()
                            endHour: '19:00',
                        },
                        {
                            day: 1,
                            startHour: '08:00', // TODO pasar a Date()
                            endHour: '19:00',
                        },
                        {
                            day: 2,
                            startHour: '08:00', // TODO pasar a Date()
                            endHour: '19:00',
                        },
                        {
                            day: 3,
                            startHour: '08:00', // TODO pasar a Date()
                            endHour: '19:00',
                        },
                        {
                            day: 4,
                            startHour: '08:00', // TODO pasar a Date()
                            endHour: '19:00',
                        },
                        {
                            day: 5,
                            startHour: '8:00', // TODO pasar a Date()
                            endHour: '12:00',
                        },
                        {
                            day: 6,
                            startHour: false, // TODO pasar a Date()
                            endHour: false,
                        },
                    ],
                    services: [
                        {
                            id:'s1',
                            name:'Caja',
                            minutesPerUser:'10',
                            nextInLineTime:'', // personas x averageTime // un arreglo de los usuarios en fila?
                            attendingResources: 4,
                            usersInLine:[ 
                                {
                                    id: 'u1',
                                },
                                {
                                    id: 'u2',
                                },
                                {
                                    id: 'u3',
                                },
                            ],
                        },
                        {
                            id:'s2',
                            name:'Asesorías',
                            minutesPerUser:'10',
                            nextInLineTime:'', // personas x averageTime // un arreglo de los usuarios en fila?
                            attendingResources: 4,
                            usersInLine:[ 
                                {
                                    id: 'u1',
                                },
                                {
                                    id: 'u2',
                                },
                                {
                                    id: 'u3',
                                },
                            ],
                        },
                        {
                            id:'s3',
                            name:'Empresas',
                            minutesPerUser:'10',
                            nextInLineTime:'', // personas x averageTime // un arreglo de los usuarios en fila?
                            attendingResources: 4,
                            usersInLine:[ 
                                {
                                    id: 'u1',
                                },
                                {
                                    id: 'u2',
                                },
                                {
                                    id: 'u3',
                                },
                            ],
                        },
                    ]
                },
            ],
        },
    ],
    admin: {
        companies:[],
        branches:[],
        services:[],
    }
}


export const companyReducer = (state =initState, action) => {
    switch (action.type) {
        case types.companyLoadCompanies:
            return {
                ...state,
                admin:{
                    ...state.admin,
                    companies: action.payload,
                }
            }
        case types.companyAddCompany:
            return {
                ...state,
                admin:{
                    ...state.admin,
                    companies:[...state.admin.companies, action.payload]
                }
            }
        case types.companyAddBranch:
            return {
                ...state,
                admin:{
                    ...state.admin,
                    branches:[...state.branches, action.payload]
                }
            }
        case types.companyAddService:
            return {
                ...state,
                admin:{
                    ...state.admin,
                    services:[...state.services, action.payload]
                }
            }
        default:
            return state;
    }
}

