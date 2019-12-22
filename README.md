# Image-hosting-service

A easy-to-integrate backend service for uploading and serving images.

## Initialize

     npm install

After installing dependencies, on root folder of the project create a "public" folder and inside this create two additional folders. One named "imgs" and one named "tmp". The "tmp" folder will be used only if you decide to configure a storage for multer. Otherwise, if you don't need to temporarily save the image before resizing, you only need to create the "imgs" folder. All the uploaded images will be saved in the "imgs" folder.

The images can be saved in different dimensions. You only need to add the list of dimensions in the .env file and require the correct dimensions in ./configs/image-sizes.js. The name format for the saved image is as follows:

     name_widthXheight.mimetype

where name is a generated uuid. Using the above filename you will be able to use the image in you frontend service.

Also, you can encapsulate the image service API by providing a list of allowed IPs in the .env fie and requiring those IPs in ./configs/allowed-ips.js.
If you need to change the way the IP is parsed , just change the implementation of ./src/middlewares/ip-parser.js file.

## API docs

| path | protocol | what it does |
|---------------------|:----------:|---------------------|
| /images/singleImage | POST | upload single image |
| /images/multiImage | POST | upload list of images |
| /images/:id | GET | fetch single image data |
| /images/ | GET | fetch data for list of imagesprovided as "ids" query |
| /images/:id | REMOVE | delete image by id |


     *the ids query param must be a list of comma separated ids
 
## Contributors

[Ergi Berdellima](https://github.com/Bhfreagra)