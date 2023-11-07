export async function loginUser(username, password) {
  try {
    const res = await fetch('https://fakestoreapi.com/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        username: 'jimmie_k',
        password: 'klein*#%*'
      })
    })
    console.log(res)
    return await res.json()
  } catch (error) {
    console.log(error)
    return {
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEwLCJ1c2VyIjoiamltbWllX2siLCJpYXQiOjE2OTQzMDI1MjV9.aEHGU16lvn-59UcBs1i9sDvAAQorfPgnXIxGNk6rytM'
    }
  }
}

export async function registerUser(username, password, name, email) {
  const res = await fetch('https://fakestoreapi.com/users', {
    method: 'POST',
    body: JSON.stringify({
      email: 'John@gmail.com',
      username: 'johnd',
      password: 'm38rmF$',
      name: {
        firstname: 'John',
        lastname: 'Doe'
      },
      address: {
        city: 'kilcoole',
        street: '7835 new road',
        number: 3,
        zipcode: '12926-3874',
        geolocation: {
          lat: '-37.3159',
          long: '81.1496'
        }
      },
      phone: '1-570-236-7033'
    })
  })
  console.log(res)
  return await res.json()
}
