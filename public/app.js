const tableBody = document.querySelector('#tableBody');
const filterBy = document.querySelector('#filterBy');
const filterByCourse = document.querySelector('#filterByCourse');
const searchBy = document.querySelector('#searchBy');
const search = document.querySelector('#search');
const pagination = document.querySelector('#pagination');
const pagePer = document.querySelector('#pagePer');

const paginationDetails = {
  page: 1,
  pageSize: 10,
  total: 0,
  totalPages: 0,
};

const query = {};
const courses = [];
let previousCourse = '';

const formatQuery = (query) => Object.keys(query).map((key) => `${key}=${encodeURIComponent(query[key])}`).join('&');

const loadPagination = () => {
  pagination.innerHTML = '';
  const { page, totalPages } = paginationDetails;

  const createPageItem = (text, enabled, pageToSet) => {
    const li = document.createElement('li');
    li.className = `page-item ${!enabled ? 'disabled' : ''}`;
    const a = document.createElement('a');
    a.className = 'page-link';
    a.innerText = text;
    (page == pageToSet) && (a.classList.add('active'))
    if (enabled) {
      a.addEventListener('click', () => {
        paginationDetails.page = pageToSet;
        fetchUser();
      });
    }
    li.appendChild(a);
    return li;
  };

  pagination.appendChild(createPageItem('<', page > 1, page - 1));
  for (let i = 1; i <= totalPages; i++) {
    const li = createPageItem(i, i !== page, i);
    pagination.appendChild(li);
  }
  pagination.appendChild(createPageItem('>', page < totalPages, page + 1));
};

const loadCourses = () => {
  filterByCourse.innerHTML = '<option selected disabled>Filter By Course</option><option value="All">All</option>';
  [...new Set(courses)].forEach((course) => {
    const option = document.createElement('option');
    option.value = course;
    option.innerText = course;
    option.selected = course === previousCourse;
    filterByCourse.appendChild(option);
  });
};

const fetchUser = async () => {
  try {
    const response = await axios.get(`/api/user?${formatQuery(query)}&page=${paginationDetails.page}&pageSize=${paginationDetails.pageSize}`);
    const result = await response.data;
    if (result.status === 200) {
      Object.assign(paginationDetails, result);
      tableBody.innerHTML = '';
      result.users.forEach((user) => {
        courses.push(user.course);
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${user.userFirstName}</td><td>${user.userLastName}</td><td>${user.userGender}</td><td>${user.course}</td><td>${user.userEmail}</td><td>${user.userPhone}</td><td>${user.userCity}</td><td>${user.totalMarks}</td><td>${user.userStatus}</td>`;
        tableBody.appendChild(tr);
      });
      loadCourses();
      loadPagination();
    }
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

document.addEventListener('DOMContentLoaded', fetchUser);

filterBy.addEventListener('change', (e) => {
  if (e.target.value === 'clear') {
    delete query.filters;
  } else {
    const [filter, value] = e.target.value.split('-');
    query.filters = JSON.stringify({ [filter]: value });
  }
  fetchUser();
});

filterByCourse.addEventListener('change', (e) => {
  const { value } = e.target;
  if (value === 'All') {
    delete query.course;
    previousCourse = '';
  } else {
    query.course = value;
    previousCourse = value;
  }
  fetchUser();
});

search.addEventListener('keyup', (e) => {
  if (e.keyCode === 13 || e.target.value === '') {
    query[searchBy.value] = e.target.value.trim();
    fetchUser();
  }
});

pagePer.addEventListener('change', (e) => {
  paginationDetails.pageSize = parseInt(e.target.value, 10);
  fetchUser();
});
