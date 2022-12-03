//
//  ServiceInfoRow.swift
//  ios
//
//  Created by Uncle Charlie on 2022/12/4.
//

import SwiftUI

struct ServiceInfoRow : View {
  var text: String

  var body: some View {
    HStack {
      Text(text) 
    }
  }
}

struct ServiceInfoRow_Previews: PreviewProvider {
  static var previews: some View {
    Group {
      ServiceInfoRow(text:"Get the weather forecast every day at 7:00am")
      ServiceInfoRow(text:"Track your work hours in Calendar iOS")
    }
    .previewLayout(.fixed(width:300, height:70))
  }
}
