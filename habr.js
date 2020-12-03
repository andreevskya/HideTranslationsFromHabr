var numBlocked = 0; 
document.querySelectorAll(".post")
    .forEach(function(item, index) {
                item.querySelectorAll(".post__type-label")
                .forEach(function(item2, index2) {
	                if(item2.title == "Перевод") {
		                item.remove();
		                ++numBlocked;
	                }
                });
    });
    
if(numBlocked > 0) {
    browser.runtime.sendMessage(numBlocked + " переводов заблочено");
} else {
    browser.runtime.sendMessage("Переводов нет");
}
