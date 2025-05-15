import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) {
    console.log('Spotify Service Listo');
  }

  getQuery( query: string ) {

    const url = `https://api.spotify.com/v1/${ query }`;

    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQA7i4P3ARXxkv5Y_BWKv_xaxvj6mDsKQrxIh_mpM_RW_ZLkoNIAS0WAl5YMrrpFwNZ2KM5yEkj3xJkPqd_8rADh83I3IFeWWLZK6tx_KnT3dtetYBaALY7i4QHQFaTfp9h3r_CcA3tGVmg2wQmv95taYbTWuEEuoCTWM9WiuUvEtRRMVUZliYVjUb6InEFhBvpVuAD-4W2bBHXZxD_vph6_Run0p8Dh1Aa3jm2UVReKzRrV4SIWOfDyMclwWNjKcdXOJ0-UwTjhNG81s2iPU3ALj73L5WviKukvY28_8J87emGAsDP9g9_zCtdxYZuX'
    });

    return this.http.get(url, { headers });

  }


  getNewReleases() {

    return this.getQuery('browse/new-releases?limit=20')
              .pipe( map( (data: any)  => data['albums'].items ));

  }

  getArtistas( termino: string ) {

    return this.getQuery(`search?q=${ termino }&type=artist&limit=15`)
                .pipe( map( (data: any) => data['artists'].items));

  }

  getArtista( id: string ) {

    return this.getQuery(`artists/${ id }`);
                // .pipe( map( data => data['artists'].items));

  }

  getTopTracks( id: string ) {

    return this.getQuery(`artists/${ id }/top-tracks?country=us`)
                .pipe( map( (data: any) => data['tracks']));

  }

}
