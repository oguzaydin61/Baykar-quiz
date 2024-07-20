export async function fetchQuizData() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();


    const questions = data.slice(0, 10).map(post => {

        const firstFourWords = post.body.split(' ').slice(0, 4).join(' ');

        return {
            question: post.title+"?",
            choices: firstFourWords.split(' ')
        };
    });

    return questions;
}




