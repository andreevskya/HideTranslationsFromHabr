function getArticleRating(item) {
    var counterContainer = item.querySelector(".tm-votes-meter");
    if(!counterContainer) {
        return undefined;
    }
    var counter = counterContainer.querySelector(".tm-votes-meter__value");
    if (!counter) {
        return undefined;
    }
    return parseInt(counter.textContent.trim().replace("–", "-"));
}

function notifyUser(text) {
    browser.runtime.sendMessage(text);
}

var numBlocked = 0;
document.querySelectorAll(".tm-articles-list__item")
    .forEach(function(item, index) {
        var rating = getArticleRating(item);
        if(rating < 0) {
            titleLink = item.querySelector(".tm-article-snippet__title-link");
            if(titleLink) {
                item.remove();
                notifyUser("Скрыта статья \"" + titleLink.firstChild.innerHTML + "\" (рейтинг " + rating + ")");
                return;
            } else {
                notifyUser("Failed to hide article with negative score");
                return
            }
        }
        item.querySelectorAll(".tm-article-snippet__label").forEach(function(item2, index2) {
            var spans = item2.querySelectorAll("span");
            if(!spans) {
                return;
            }
            for(var i = 0; i < spans.length; ++i) {
                if(spans[i].innerHTML.trim() == "Перевод") {
                    item.remove();
                    ++numBlocked;
                    return;
                }
            }
        });
    });

if (numBlocked > 0) {
    notifyUser(numBlocked + " переводов заблочено");
} else {
    notifyUser("Переводов нет");
};
