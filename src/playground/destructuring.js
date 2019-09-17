// destructuring objects

const book = {
    title: 'Becoming',
    author: 'Michelle Obama',
    publisher: {
        // name: 'Penguin',
        age: 5
    }
}

const { name: publisherName = 'Self published' } = book.publisher;


console.log(publisherName);


// destructuring arrays

const address = ['1277 Cottonwood Crescent', 'Oakville', 'ON', 'L6M 2W7'];

console.log(`You are in ${address[1]}, ${address[2]}.`)

const item = ['Coffee (hot)', '$1', '$2', '$3']

const [coffee, , medPrice] = item;

console.log(`A medium ${coffee} costs ${medPrice}.`)