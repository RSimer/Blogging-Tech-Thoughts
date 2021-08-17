const commentFormSubmit = async (event) => {
    event.preventDefault();

    const content = document.querySelector('#comment').value.trim();
    const postId = document.querySelector('#blogpostId').value.trim();

    if (content) {
        const response = await fetch('/api/blogposts/comment', {
            method: 'POST',
            body: JSON.stringify({ commentText, postId }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            location.reload();
        } else {
            alert('Please add text to comment before submitting');
        }
    }
};

// Listen for the comment form submission
document
    .querySelector('.comment-form')
    .addEventListener('submit', commentFormSubmit);