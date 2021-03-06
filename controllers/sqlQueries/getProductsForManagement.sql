SELECT
	productid AS 'productId',
	prod.producturl AS "fullUrl",
    prod.createdAt,
    web.url AS "websiteUrl"
FROM   discounthero.products prod 
JOIN   discounthero.websites web ON prod.websiteid = web.websiteid 
JOIN   discounthero.websitesSelectors webSelectors ON webSelectors.websiteid = web.websiteid 
WHERE  web.isActive = 1
AND    prod.isActive = 0
AND STR_TO_DATE(prod.deletedAt, '%d-%b-%Y') IS NULL