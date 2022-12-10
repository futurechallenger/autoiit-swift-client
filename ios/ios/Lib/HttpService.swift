//
//  HttpService.swift
//  ios
//
//  Created by Uncle Charlie on 2022/12/6.
//

import Foundation

struct HTTPService {
  static let BACKEND_URL = "http://127.0.0.1:5050"
  
  static func request( serverURL: String = BACKEND_URL,
                       method: String? = "GET",
                       headers: Dictionary<String, String>? = ["Content-Type": "application/json"],
//                       body: Dictionary<String, AnyCodable>? = nil) async -> [String: Any]? {
                       body: NSMutableDictionary? = nil) async -> [String: Any]? {
    var req = URLRequest(url: URL(string: serverURL)!)
    req.httpMethod = method ?? "GET"
    req.allHTTPHeaderFields = headers ?? ["Content-Type": "application/json"]
    
    // set request body
    if let body = body {
      req.httpBody = try? JSONSerialization.data(withJSONObject: body)
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
  
  static func requestGQL(query: String, retrieveKey: String, variables: [String:Any]?, operationName: String? ) async -> Any? {
    var gql = NSMutableDictionary(dictionary: ["query": query])
//    var gql: [String: Any] = ["query": query]
    
    // Set variables of query
    if let variables = variables {
      gql["variables"] = variables
    }
    
    // Set operation name of query
    if let operationName = operationName {
      gql["operationName"] = operationName
    }
    
    guard let ret = await HTTPService.request(
      serverURL: "\(BACKEND_URL)/graphql",
      method: "POST",
      headers: ["Content-Type": "application/json"],
      body: gql) else {
      return nil
    }
    
    if let errors = ret["errors"] {
      print("ERRORS: \(errors)")
      return nil
    }
    
    guard let data = ret["data"] as? [String: Any] else {
      print("ERROR: No data can be found")
      return nil
    }
    
    return data[retrieveKey]
  }
}



