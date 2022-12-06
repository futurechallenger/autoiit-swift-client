//
//  HttpService.swift
//  ios
//
//  Created by Uncle Charlie on 2022/12/6.
//

import Foundation

class HTTPService {
  let BACKEND_URL = "http://127.0.0.1:5050"
  
  func request<ResType:Decodable>(method: String?, headers: Dictionary<String, String>) async -> ResType? {
    var req = URLRequest(url: URL(string: BACKEND_URL)!)
    req.httpMethod = method ?? "GET"
    req.allHTTPHeaderFields = headers
    
    do {
      let (data, response) = try await URLSession.shared.data(for: req)
      guard let httpResponse = response as? HTTPURLResponse, (200...299).contains(httpResponse.statusCode) else {
        return nil
      }
      
      let decodedVal = try? JSONDecoder().decode(ResType.self,from: data)
      return decodedVal
    } catch {
      return nil
    }
  }
}

