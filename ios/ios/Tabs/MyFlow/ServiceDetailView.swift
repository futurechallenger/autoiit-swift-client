//
//  ServiceDetailView.swift
//  ios
//
//  Created by Uncle Charlie on 2022/12/4.
//

import SwiftUI

struct ServiceDetailView: View {
  var recommendedServices: [ServiceInfo]?
  
    var body: some View {
      let firstEl = (self.recommendedServices ?? [ServiceInfo(id:-1, name: "Empty Service")])[0]
      Text(firstEl.name)
    }
}

struct ServiceDetailView_Previews: PreviewProvider {
    static var previews: some View {
        ServiceDetailView(recommendedServices: [ServiceInfo(id: 1, name: "Sample Service")])
    }
}
