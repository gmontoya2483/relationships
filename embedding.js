const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', {useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors: [{
    type: authorSchema,
    required: true
  }]

}));

async function createCourse(name, authors) {
  const course = new Course({
    name, 
    authors
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthorFindById(courseId){
  const course = await Course.findById(courseId);
  course.author.name = 'Gabriel';
  course.save();
}

async function updateAuthorUpdate(courseId){
  const course = await Course.updateOne({_id: courseId},{
    $set: {
      'author.name': 'Hernan'
    }
  });
}

async function deleteAuthor(courseId){
  const course = await Course.updateOne({_id: courseId},{
    $unset: {
      'author': ''
    }
  });
}

async function addAuthor(courseId, author){
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save();

}

async function removeAuthor(courseId, authorId){
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.remove();
  course.save();

}


//updateAuthorFindById('5e77be01bcf83734102ae5a6');
//updateAuthorUpdate('5e77be01bcf83734102ae5a6');
// deleteAuthor('5e77be01bcf83734102ae5a6');

// createCourse('Node Course', [
//     new Author({ name: 'Mosh' }),
//   new Author({ name: 'Gabriel' }),
//   new Author({ name: 'Hernan' })
// ]);

//addAuthor('5e77c7370094242fc49411b2', new Author({name: "sarasa", bio: "Sarasas's bio is huge and amazing"}));
removeAuthor('5e77c7370094242fc49411b2', '5e77c7370094242fc49411b1');
