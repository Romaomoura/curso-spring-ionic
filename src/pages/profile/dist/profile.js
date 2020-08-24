"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProfilePage = void 0;
var api_config_1 = require("./../../config/api.config");
var core_1 = require("@angular/core");
var ionic_angular_1 = require("ionic-angular");
var ProfilePage = /** @class */ (function () {
    function ProfilePage(navCtrl, navParams, storage, clienteService, camera, sanitazer) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.clienteService = clienteService;
        this.camera = camera;
        this.sanitazer = sanitazer;
        this.cameraOn = false;
        this.profileImage = 'assets/imgs/profile.png';
    }
    ProfilePage.prototype.ionViewDidLoad = function () {
        this.loadData();
    };
    ProfilePage.prototype.loadData = function () {
        var _this = this;
        var localUser = this.storage.getLocalUser();
        if (localUser && localUser.email) {
            this.clienteService.findByEmail(localUser.email).subscribe(function (response) {
                _this.cliente = response;
                _this.getImageIfExists();
            }, function (error) {
                if (error.status == 403) {
                    _this.navCtrl.setRoot('HomePage');
                }
            });
        }
        else {
            this.navCtrl.setRoot('HomePage');
        }
    };
    ProfilePage.prototype.getImageIfExists = function () {
        var _this = this;
        this.clienteService.getImageFromBucket(this.cliente.id).subscribe(function (response) {
            _this.cliente.imageUrl = api_config_1.API_CONFIG.bucketUrl + "/cp" + _this.cliente.id + ".jpg";
            _this.blobToDataURL(response).then(function (dataUrl) {
                var str = dataUrl;
                _this.profileImage = _this.sanitazer.bypassSecurityTrustUrl(str);
            });
        }, function (error) {
            _this.profileImage = 'assets/imgs/profile.png';
        });
    };
    // https://gist.github.com/frumbert/3bf7a68ffa2ba59061bdcfc016add9ee
    ProfilePage.prototype.blobToDataURL = function (blob) {
        return new Promise(function (fulfill, reject) {
            var reader = new FileReader();
            reader.onerror = reject;
            reader.onload = function (e) { return fulfill(reader.result); };
            reader.readAsDataURL(blob);
        });
    };
    ProfilePage.prototype.getCameraPicture = function () {
        var _this = this;
        this.cameraOn = true;
        var options = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.PNG,
            mediaType: this.camera.MediaType.PICTURE
        };
        this.camera.getPicture(options).then(function (imageData) {
            _this.picture = 'data:image/png;base64,' + imageData;
            _this.cameraOn = false;
        }, function (err) {
            _this.cameraOn = false;
        });
    };
    ProfilePage.prototype.sendPicture = function () {
        var _this = this;
        this.clienteService.uploadPicture(this.picture)
            .subscribe(function (response) {
            _this.picture = null;
            _this.getImageIfExists();
        }, function (error) {
        });
    };
    ProfilePage.prototype.cancel = function () {
        this.picture = null;
    };
    ProfilePage.prototype.getGalleryPicture = function () {
        var _this = this;
        this.cameraOn = true;
        var options = {
            quality: 100,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.PNG,
            mediaType: this.camera.MediaType.PICTURE
        };
        this.camera.getPicture(options).then(function (imageData) {
            _this.picture = 'data:image/png;base64,' + imageData;
            _this.cameraOn = false;
        }, function (err) {
            _this.cameraOn = false;
        });
    };
    ProfilePage = __decorate([
        ionic_angular_1.IonicPage(),
        core_1.Component({
            selector: "page-profile",
            templateUrl: "profile.html"
        })
    ], ProfilePage);
    return ProfilePage;
}());
exports.ProfilePage = ProfilePage;
