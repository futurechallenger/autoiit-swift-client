//
//  HttpService.swift
//  ios
//
//  Created by Uncle Charlie on 2022/12/6.
//

import Foundation

class HTTPService {
  static let BACKEND_URL = "http://127.0.0.1:5050"
  
  static func request<ResType:Decodable>(of type: ResType.Type, method: String? = "GET",
                                         headers: Dictionary<String, String>? = ["Content-Type": "application/json"],
                                         body: Dictionary<String, String>? = nil) async -> [String: Any]? {
    var req = URLRequest(url: URL(string: BACKEND_URL)!)
    req.httpMethod = method ?? "GET"
    req.allHTTPHeaderFields = headers ?? ["Content-Type": "application/json"]
    
    // set request body
    if let body = body {
      req.httpBody = try? JSONEncoder().encode(body)
    }
    
    do {
      let (data, response) = try await URLSession.shared.data(for: req)
      guard let httpResponse = response as? HTTPURLResponse, (200...299).contains(httpResponse.statusCode) else {
        return nil
      }
      
      guard let resJson = try? JSONSerialization.jsonObject(with: data, options: .fragmentsAllowed) as? [String: Any], resJson != nil else {
        return nil
      }
      
      return resJson
    } catch {
      return nil
    }
  }
}


