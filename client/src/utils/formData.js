const formData = {
  login: {
    inputs: [
      {
        placeholder: 'Email',
        name: 'email',
        type: 'text',
        value: ''
      },
      {
        placeholder: 'Mot de passe',
        name: 'password',
        type: 'password',
        value: ''
      }
    ],
    button: {
      label: 'Se connecter'
    }
  },
  search: {
    input: {
      name: 'search',
      type: 'text',
      value: '',
      placeholder: 'Prénom, nom ou poste'
    },
    button: {
      label: 'Rechercher'
    }
  }
}

export default formData
