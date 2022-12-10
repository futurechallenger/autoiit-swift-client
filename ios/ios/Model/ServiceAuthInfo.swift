//
//  ServiceAuthInfo.swift
//  ios
//
//  Created by Uncle Charlie on 2022/12/10.
//

import Foundation

struct ServiceAuthInfo: Hashable, Identifiable {
  var id: Int
  var authorizationUrl: String
  var providerName: String
  
  init () {
    self.id = -1
    self.authorizationUrl = ""
    self.providerName = ""
  }
  
  init (id: Int, authorizationUrl: String, providerName: String) {
    self.id = id
    self.authorizationUrl = authorizationUrl
    self.providerName = providerName
  }
  
  func doAuth() {
    // TODO:
  }
}

