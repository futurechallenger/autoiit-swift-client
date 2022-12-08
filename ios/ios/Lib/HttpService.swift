//
//  HttpService.swift
//  ios
//
//  Created by Uncle Charlie on 2022/12/6.
//

import Foundation

struct HTTPService {
  static let BACKEND_URL = "http://127.0.0.1:5050"
  
  static func request( method: String? = "GET",
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
      
      guard let resJson = try? JSONSerialization.jsonObject(with: data, options: .fragmentsAllowed) as? [String: Any] else {
        return nil
      }
      
      return resJson
    } catch {
      return nil
    }
  }
  
  static func requestGQL(query: String, retriveKey: String, variables: [String:Any]?, operationName: String? ) async -> Any? {
    var gql = NSMutableDictionary(dictionary: ["query": query])
    
    // Set variables of query
    if let variables = variables {
      gql["variables"] = variables
    }
    
    // Set operation name of query
    if let operationName = operationName {
      gql["operationName"] = operationName
    }
    
    guard let ret = await HTTPService.request(method: "POST", headers: ["Content-Type": "application/json"], body: ["query": query]) else {
      return nil
    }
    
    guard let data = ret["data"] as? [String: Any], let retrived = data[retriveKey] as? [String: Any] else {
      return nil
    }
    
    return retrived
  }
}



