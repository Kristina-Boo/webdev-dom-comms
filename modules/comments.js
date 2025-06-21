const currentDate = new Date();
     const day = currentDate.getDate().toString().padStart(2, '0');
     const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Месяцы в JS от 0 до 11
     const year = currentDate.getFullYear();
     const hours = currentDate.getHours().toString().padStart(2, '0');
     const minutes = currentDate.getMinutes().toString().padStart(2, '0');
     const formattedDate = `${day}.${month}.${year} ${hours}:${minutes}`;
export let comments = [
  {
    name: "Глеб Фокин",
    date: `${formattedDate}`,
    text: "Это будет первый комментарий на этой странице",
    likes: 3,
    isLiked: true
  },
  {
    name: "Варвара Н.",
    date: `${formattedDate}`,
    text: "Мне нравится как оформлена эта страница! ❤",
    likes: 75,
    isLiked: false
  },
];