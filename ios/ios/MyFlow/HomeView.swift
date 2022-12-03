//
//  HomeView.swift
//  ios
//
//  Created by Uncle Charlie on 2022/12/4.
//

import SwiftUI

struct HomeView: View {
  var body: some View {
    List {
      IntroductionRow()
      ServiceInfoRow(text: "Hello World!")
      ServiceInfoRow(text: "Autoiiiiiiiiiiiiiit!")
    }
  }
}

struct HomeView_Previews: PreviewProvider {
  static var previews: some View {
    HomeView()
  }
}
