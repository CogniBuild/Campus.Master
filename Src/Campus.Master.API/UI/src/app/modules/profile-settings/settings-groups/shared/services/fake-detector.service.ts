import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class FakeDetectorService {

    constructor(private http: HttpClient) { }

    uploadImage(imageToUpload: File) {
        const formData = new FormData();
        formData.append('Image', imageToUpload);

        return this.http.post('/api/fakedetector/validateImage', formData);
    }
}
