const API = `https://test-users-api.herokuapp.com/users/`;
let usersCard = document.querySelector('#user_cards');
let users = [];

const getUsers= () => {
    return fetch(API).then(res => {
        return res.json();
    }).then(user => {
        return user.data;
    })
    .catch(err => {
        console.log('Cant find users', err);
        return [];
    })
}

const renderUsers = () => {
    usersCard.innerHTML = ''
    users.forEach(user => {
        const userItem = document.createElement('div');
        userItem.classList.add('user');
        
        const inputAge = document.createElement(`input`);
        inputAge.classList.add(`inputAge`);
        inputAge.value = `${user.age}`;

        const inputName = document.createElement(`input`);
        inputName.classList.add(`inputName`);
        inputName.value = `${user.name}`;

        const removeBtn = document.createElement('button');
        removeBtn.classList.add('remove_button');
        removeBtn.innerHTML = 'X';
        removeBtn.addEventListener('click', () => {
            deleteUser(user.id, userItem)});

        const saveBtn = document.createElement('button');
        saveBtn.classList.add('save_button');
        saveBtn.innerHTML = '&#10003';
        saveBtn.addEventListener('click', createUser);

        userItem.append(saveBtn);
        userItem.append(removeBtn);
        userItem.append(inputAge);
        userItem.append(inputName);
        usersCard.append(userItem);
      });
    }

const loadUsers = async () => {
    users = await getUsers();
    renderUsers();
}

const deleteUser =  async (userId, userItem) => {
    try {
        const res = await fetch(API + userId, { 
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',}
        });
        if (res.status !== 200) throw new Error();
        users = users.filter((user) => user.id !== userId);
        userItem.remove();
    } catch (err) {
        console.log(`Can't delete a user,`, err);   
    }
}
//////create user in server
const createUser = () => {
    fetch(API , {
        method: `POST`,
        body: JSON.stringify({name: name, age: age}),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',}
    }).then(res => {
        return (res.json());
    }).catch(err => {
        console.log(`Can't create user`, err);
    })
}
//////create user in html document
const createCard = () => {
    const name = document.querySelector(`#name`).value;
    const age = document.querySelector(`#age`).value;
        const user = {
            name,
            age};
          users.unshift(user)
          renderUsers();
}

document.addEventListener('DOMContentLoaded', () => {
    const load = document.querySelector('#load_users')
    load.addEventListener('click', loadUsers);
    const createUserBtn = document.querySelector('#create_user')
    createUserBtn.addEventListener('click', createCard);
  });








