const error = (error) => console.error('Error:', error);

document.addEventListener('DOMContentLoaded', function() {
  // Función para obtener todos los cursos y sus profesores
  function getAllCourses() {
    axios.post('http://localhost:3001/graphql', { // Modifica la URL para que apunte a tu servidor GraphQL
      query: `
        query {
          getAllCourses {
            _id
            name
            credits
            teacher {
              _id
              first_name
              last_name
            }
          }
        }
      `
    }).then(function(response) {
      const courses = response.data.data.getAllCourses;
      // Mostrar los cursos en la página
      courses.forEach(function(course) {
        const courseElement = document.createElement('div');
        courseElement.classList.add('course');
        courseElement.innerHTML = `
          <h2>${course.name}</h2>
          <p>Creditos: ${course.credits}</p>
          <p>Profesor: <span class="teacher">${course.teacher.first_name} ${course.teacher.last_name}</span></p>
        `;
        document.getElementById('courses-list').appendChild(courseElement);
      });
    }).catch(error);
  }

  // Llamar a la función para obtener todos los cursos al cargar la página
  getAllCourses();
});

// Resto de tu código...
