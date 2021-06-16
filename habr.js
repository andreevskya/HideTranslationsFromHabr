function getArticleRating(item) {
    var counter = item.querySelector(".post-stats__result-counter");
    if (!counter) {
        return undefined;
    }
    return parseInt(counter.textContent.trim().replace("–", "-"));
}

function notifyUser(text) {
    browser.runtime.sendMessage(text);
}

var numBlocked = 0;
document.querySelectorAll(".post")
    .forEach(function(item, index) {
        var rating = getArticleRating(item);
        if(rating < 0) {
            titleLink = item.querySelector(".post__title_link") || item.querySelector(".preview-data__title-link");
            if(titleLink) {
                item.remove();
                notifyUser("Скрыта статья \"" + titleLink.textContent + "\" (рейтинг " + rating + ")");
                return;
            } else {
                notifyUser("Failed to hide article with negative score");
                return
            }
        }
        item.querySelectorAll(".post__type-label").forEach(function(item2, index2) {
            if (item2.title == "Перевод") {
                item.remove();
                ++numBlocked;
            }
        });
    });

if (numBlocked > 0) {
    notifyUser(numBlocked + " переводов заблочено");
} else {
    notifyUser("Переводов нет");
};
