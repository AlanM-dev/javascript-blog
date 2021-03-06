/* eslint-disable no-inner-declarations */
{
  'use strict';

  const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
    authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
    tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
    authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML)
  };



  // MODUŁ 6.3 //
  // CLICK HANDLER // ---------------------------------------------
  const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    //console.log('Link was clicked!');
    //console.log(event);

    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */
    //console.log('clickedElement:', clickedElement);

    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts .active');

    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');
    //console.log(articleSelector);

    /* [DONE]find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);
    //console.log(targetArticle);

    /* [DONE] add class 'active' to the correct article */
    targetArticle.classList.add('active');
  };

  // MODUŁ 6.4 //
  // ARTICLE SELECTOR // --------------------------------------------------
  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles';

  function generateTitleLinks(customSelector = ''){

    /* [DONE] remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    /* [DONE] for each article */
    //const articles = document.querySelectorAll(optArticleSelector);
    const articles = document.querySelectorAll(optArticleSelector + customSelector);

    let html = '';

    for(let article of articles){
      //console.log(article);

      /* [DZIALA] get the article id */
      const articleId = article.getAttribute('id');
      //console.log(articleId);

      /* [DONE] find the title element */
      const titleId = document.querySelector(optTitleSelector);
      //console.log(titleId);

      /* [DONE] get the title from the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      /* [DONE] create HTML of the link */
      //const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      //console.log(linkHTML);
      const linkHTMLData = {id: articleId, title: articleTitle};
      const linkHTML = templates.articleLink(linkHTMLData);


      /* [DONE] insert link into titleList */
      html = html + linkHTML;

    }

    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');
    //console.log(links);

    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }

  }

  generateTitleLinks();


  function calculateTagsParams(tags){
    const params = {max:0, min:999999};
    for(let tag in tags){
      console.log(tag + ' is used ' + tags[tag] + ' times');
      if(tags[tag] > params.max){
        params.max = tags[tag];
      }
      if(tags[tag] < params.min){
        params.min = tags[tag];
      }
    }
    return params;
  }

  // MODUŁ 7.2 i 7.3 //

  // GENERATE TAGS // ----------------------------------------------
  const optArticleTagsSelector = '.post-tags .list';
  const optTagsListSelector = '.tags.list'; // PO CO TO JEST? NIGDZIE NIE JEST UZYTE? //
  const optCloudClassCount = 5;
  const optCloudClassPrefix ='tag-size-';


  function calculateTagClass (count, params) {
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
    return (optCloudClassPrefix + classNumber);
  }


  function generateTags(){
    /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};

    /* [DONE] find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* [DONE] START LOOP: for every article: */
    for(let article of articles){

      /* [DONE] find tags wrapper */
      const tagsList = article.querySelector(optArticleTagsSelector);
      //tagsList.innerHTML = '';

      /* [DONE] make html variable with empty string */
      let html = '';

      /* [DONE] get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');

      /* [DONE] split tags into array */
      const articleTagsArray = articleTags.split(' ');

      /* [DONE] START LOOP: for each tag */
      for(let tag of articleTagsArray){

        /* [DONE] generate HTML of the link */
        //const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>' + '\n';
        const linkHTMLData = {tag: tag};
        const linkHTML = templates.tagLink(linkHTMLData);

        /* [DONE] add generated code to html variable */
        html = html + linkHTML;

        /* [NEW] check if this link is NOT already in allTags */
        if(!allTags[tag]){
          /* [NEW] add tag to allTags object */
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }

      /* [DONE] END LOOP: for each tag */
      }

      /* [DONE] insert HTML of all the links into the tags wrapper */
      tagsList.innerHTML = html;

    /* END LOOP: for every article: */
    }

    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector('.tags');

    /* [NEW] create variable for all links HTML code */
    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams:', tagsParams);
    //let allTagsHTML = '';
    const allTagsData = {tags: []};

    /* [NEW] START LOOP: for each tag in allTags: */
    for(let tag in allTags){
      /* [NEW] generate code of a link and add it to allTagsHTML */
      //allTagsHTML += tag + ' (' + allTags[tag] + ') ';
      //console.log(allTagsHTML);
      // const tagLinkHTML = '<li><a href="#tag=' + tag + '" class="' + calculateTagClass(allTags[tag], tagsParams) + '"' + '">' + tag + ' (' + allTags[tag] + ')' + '</a></li>';
      // allTagsHTML += tagLinkHTML;
      allTagsData.tags.push({
        tag: tag,
        count: allTags[tag],
        className: calculateTagClass(allTags[tag], tagsParams)
      });


    /* [NEW] END LOOP: for each tag in allTags: */
    }

    /*[NEW] add HTML from allTagsHTML to tagList */
    //tagList.innerHTML = allTagsHTML;
    tagList.innerHTML = templates.tagCloudLink(allTagsData);
    console.log(allTagsData);
  }

  generateTags();

  // TAG CLICK HANDLER // -------------------------------------------------

  function tagClickHandler(event){
    /* [DONE] prevent default action for this event */
    event.preventDefault();

    /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;

    /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');

    /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');

    /* [DONE] find all tag links with class active */
    const activeLinks = document.querySelectorAll('a[href="' + href + '"]');

    /* [DONE] START LOOP: for each active tag link */
    for(let activeLink of activeLinks){

      /* [DONE] remove class active */
      activeLink.classList.remove('active');

    /* [DONE] END LOOP: for each active tag link */
    }

    /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
    const tagLinks = document.querySelectorAll(href);

    /* [DONE] START LOOP: for each found tag link */
    for(let tagLink of tagLinks){

      /* [DONE] add class active */
      tagLink.classList.add('active');

    /* [DONE] END LOOP: for each found tag link */
    }

    /* [DONE] execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');

  }

  function addClickListenersToTags(){
    /* find all links to tags */
    const activeLinks = document.querySelectorAll('.post-tags .list a');

    /* START LOOP: for each link */
    for(let link of activeLinks){

      /* add tagClickHandler as event listener for that link */
      link.addEventListener('click', tagClickHandler);

    /* END LOOP: for each link */
    }
  }

  addClickListenersToTags();

  // AUTHORS ///// -------------------------------------------
  const optArticleAuthorSelector = '.post-author';

  function generateAuthors(){
    const articles = document.querySelectorAll(optArticleSelector);

    const allAuthors = [];

    let html = '';

    for(let article of articles){
      const author = article.querySelector(optArticleAuthorSelector);

      author.innerHTML = '';

      const articleAuthor = author.getAttribute('data-author');



      //const linkHTML = '<a href="#' + articleAuthor + '"><span>' + articleAuthor + '</span></a>';

      const linkHTMLData = {class: articleAuthor, title: articleAuthor};
      const linkHTML = templates.authorLink(linkHTMLData);



      if(!allAuthors.includes(articleAuthor)){
        allAuthors.push(articleAuthor);
        html = html + linkHTML;
      }

      author.innerHTML = linkHTML;
    }

    const authorList = document.querySelector('.authors');
    authorList.innerHTML = html;


    const authorLinks = document.querySelectorAll('.list.authors a');

    for(let authorLink of authorLinks){
      authorLink.addEventListener('click', authorClickHandler);
    }

  }

  generateAuthors();

  function authorClickHandler(event) {

    event.preventDefault();
    const clickedElement = this;

    const href = clickedElement.getAttribute('href');

    const author = href.replace('#', '');

    const activeLinks = document.querySelectorAll('.list.authors a.active');

    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }

    const authorLinks = document.querySelectorAll('.list.authors a[href="' + href + '"]');

    for(let authorLink of authorLinks){
      authorLink.classList.add('active');
    }

    generateTitleLinks('[data-author="' + author + '"]');

  }

  function addClickListenersToAuthors(){

    const activeLinks = document.querySelectorAll('.post-author');

    for(let link of activeLinks){

      link.addEventListener('click', authorClickHandler);
    }

  }

  addClickListenersToAuthors();


}
