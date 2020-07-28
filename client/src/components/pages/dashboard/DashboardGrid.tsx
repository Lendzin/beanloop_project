import React, {useEffect} from 'react'
import GridLayout, {Layout} from 'react-grid-layout'
import styled from 'styled-components'
import {Dashboard as WidgetWrapper} from '@beanloop-ab/dashboard-core/dist/src/components/dashboard'
import {
  Widget,
  widget,
} from '@beanloop-ab/dashboard-core/dist/src/widgets/widget'
import {Tooltip} from '@material-ui/core'
import Card, {CardProps} from '@material-ui/core/Card'
import Button, {ButtonProps} from '@material-ui/core/Button'
import {connect} from 'react-redux'
import {LayoutWidget} from '@beanloop-ab/dashboard-core/dist/src/lib/entities'
import {
  updateLayout,
  addWidget,
  removeWidget,
} from '../../../actions/dashboardActions'
import {updateDashboard} from '../../../actions/userActions'
import {showNotification} from '../../../actions/appActions'
import {Close as CloseIcon} from '@material-ui/icons'
import IconButton from '@material-ui/core/IconButton'

const StyledButton = styled(Button)`
  && {
    position: fixed;
    right: 0;
    left: 0;
    width: 120px;
    bottom: 0;
    margin-bottom: 20px;
    margin-right: auto;
    margin-left: auto;
  }
` as React.ComponentType<ButtonProps>

const StyledCard = styled(Card)`
  && {
    box-shadow: none;
  }
` as React.ComponentType<CardProps>

const widgetStyles = {
  padding: 30,
  boxSizing: 'content-box',
  margin: 0,
}

function findDuplicateY(layout: Layout[]) {
  let row: any = {}

  const duplicateYs: any[] = layout.map((item: Layout) => {
    if (!row[item.y]) {
      row[item.y] = 0
    }
    row[item.y] += 1
    if (row[item.y] === 2) {
      return item.y
    }
  })
  //map creates "undefined" if no return is present, this removes that, albeit, it also works without it (other solutions require for-loop).
  const filteredDuplicates = duplicateYs.filter((number) => {
    return number != undefined
  })

  return filteredDuplicates
}

const DashboardGrid = (props: any) => {
  const {
    listOfWidgets,
    buckets,
    layout,
    updateLayout,
    callBackToRender,
    updateDashboard,
    dashboard,
    addWidget,
    removeWidget,
    showNotification,
  } = props

  useEffect(() => {
    if (
      dashboard.configObject &&
      listOfWidgets.length === 0 &&
      layout.length === 0
    ) {
      console.log(dashboard)
      dashboard.configObject.listOfWidgets.forEach((widget: any) => {
        const filteredLayout = dashboard.configObject.layout.filter(
          (widgetLayout: any) => {
            return widget.id === widgetLayout.i
          }
        )
        const widgetObject = {
          widget: widget,
          layout: filteredLayout[0],
        }
        addWidget(widgetObject)
      })
    }
  }, [])

  function renderWidget(widget: any) {
    const gridWidgetBase = (props: any) => (
      <StyledCard>
        <Widget {...props} style={{...widgetStyles, ...props.style}} />
      </StyledCard>
    )
    const configuration = () => {
      return {
        widgetConfiguration: {
          type: LayoutWidget.verticalList,
          widgets: [widget],
        },
      }
    }

    return (
      <WidgetWrapper
        widgetBaseComponent={gridWidgetBase}
        buckets={buckets}
        configuration={configuration()}
      />
    )
  }
  function onLayoutChange(layout: Layout[]) {
    updateLayout(layout)
  }

  function saveRender() {
    const config = buildDashboardConfig()
    callBackToRender(true, config)
    const configuration = {
      config: config,
      layout: layout,
      listOfWidgets: listOfWidgets,
    }
    updateDashboard(dashboard, configuration)
      .then(() => {
        showNotification('Dashboard changes has been saved!', 'success', 3000)
      })
      .catch(() => {
        showNotification('Something went wrong', 'error', 3000)
      })
  }

  function findSpecialCase(layout: any) {
    const specialCases = layout.reduce((array: any, innerLayout: any) => {
      let filteredY: any[] = []
      let filteredY2: any[] = []
      if (innerLayout.h === 2) {
        filteredY = layout.filter(
          (lay: any) =>
            innerLayout.y === lay.y && lay.i !== innerLayout.i && lay.h !== 2
        )
        filteredY2 = layout.filter(
          (lay2: any) =>
            innerLayout.y + 1 === lay2.y &&
            lay2.i !== innerLayout.i &&
            lay2.h !== 2
        )
        const object: any = {}
        if (filteredY.length > 0) {
          object.y = filteredY
          object.case = innerLayout
        } else {
          object.case = innerLayout
          object.y = []
        }
        if (filteredY2.length > 0) {
          object.y2 = filteredY2
          object.case = innerLayout
        } else {
          object.case = innerLayout
          object.y2 = []
        }
        if (filteredY2.length > 0 || filteredY.length > 0) {
          return [...array, object]
        }
      }
      return [...array]
    }, [])
    return specialCases
  }

  function generateListExcludedIds(specialCases: any) {
    const listOfCases = specialCases.reduce(
      (array: any, element: any) => [
        ...array,
        element.case,
        ...element.y,
        ...element.y2,
      ],
      []
    )
    const listOfIds = listOfCases.reduce(
      (array2: any, element2: any) => [...array2, element2.i],
      []
    )
    return listOfIds
  }

  function removeExcludedIds(layout: any, excludedIds: any) {
    const newLayout = layout.filter(
      (actualLayout: any) => !excludedIds.includes(actualLayout.i)
    )
    return newLayout
  }

  function createVerticalListWithFlex(widgets: any[], flex: number) {
    return {
      type: LayoutWidget.verticalList,
      widgets: widgets,
      style: {flex: flex},
    }
  }

  function createHorizonatalListWithY(widgets: any[], y: number) {
    return {
      type: LayoutWidget.horizontalList,
      widgets: widgets,
      y: y,
    }
  }

  function getSpecialWidgetConfig(
    specialCase: any,
    widgetsFirstRow: any,
    widgetsSecondRow: any
  ) {
    const largeWidget = findWidget(specialCase.case.i)
    const largeWidgetY: number = specialCase.case.y
    if (specialCase.case.x === 0) {
      return createHorizonatalListWithY(
        [
          createVerticalListWithFlex([largeWidget], 3),
          createVerticalListWithFlex(
            [
              createHorizonatalListWithY(widgetsFirstRow, 0),
              createHorizonatalListWithY(widgetsSecondRow, 0),
            ],
            3
          ),
        ],
        largeWidgetY
      )
    }
    if (specialCase.case.x === 1) {
      return createHorizonatalListWithY(
        [
          createVerticalListWithFlex(
            [
              createHorizonatalListWithY([widgetsFirstRow[0]], 0),
              createHorizonatalListWithY([widgetsSecondRow[0]], 0),
            ],
            1
          ),
          createVerticalListWithFlex([largeWidget], 3),

          createVerticalListWithFlex(
            [
              createHorizonatalListWithY(
                [widgetsFirstRow[1], widgetsFirstRow[2]],
                0
              ),
              createHorizonatalListWithY(
                [widgetsSecondRow[1], widgetsSecondRow[2]],
                0
              ),
            ],
            2
          ),
        ],
        largeWidgetY
      )
    }
    if (specialCase.case.x === 2) {
      return createHorizonatalListWithY(
        [
          createVerticalListWithFlex(
            [
              createHorizonatalListWithY(
                [widgetsFirstRow[0], widgetsFirstRow[1]],
                0
              ),
              createHorizonatalListWithY(
                [widgetsSecondRow[0], widgetsSecondRow[1]],
                0
              ),
            ],
            2
          ),
          createVerticalListWithFlex([largeWidget], 3),
          createVerticalListWithFlex(
            [
              createHorizonatalListWithY([widgetsFirstRow[2]], 0),
              createHorizonatalListWithY([widgetsSecondRow[2]], 0),
            ],
            1
          ),
        ],
        largeWidgetY
      )
    }
    if (specialCase.case.x === 3) {
      return createHorizonatalListWithY(
        [
          createVerticalListWithFlex(
            [
              createHorizonatalListWithY(widgetsFirstRow, 0),
              createHorizonatalListWithY(widgetsSecondRow, 0),
            ],
            3
          ),
          createVerticalListWithFlex([largeWidget], 3),
        ],
        largeWidgetY
      )
    }
  }
  function createSpecialCaseWidgets(specialCases: any) {
    const hiddenWidget = {
      background: '#000000',
      description: '',
      descriptionTitle: '',
      size: '1',
      source: {
        number: {
          bucket: 'marketingNumbers',
          prop: 'reach',
          valueType: 3,
        },
      },
      style: {
        visibility: 'hidden',
        flex: 1,
      },
      title: '',
      type: 'number',
    }

    const specialWidgets = specialCases.map((specialCase: any) => {
      const firstRowCases = specialCase.y
      const secondRowCases = specialCase.y2
      const actualCase = specialCase.case
      const firstRowXs = firstRowCases.reduce(
        (array: number[], caseRow: any) => {
          return [...array, caseRow.x]
        },
        []
      )
      const secondRowXs = secondRowCases.reduce(
        (array: number[], caseRow: any) => {
          return [...array, caseRow.x]
        },
        []
      )
      const arrayY: any = []
      const arrayY2: any = []
      if (firstRowCases.length !== 0) {
        if (firstRowCases[0].w !== 3) {
          for (let i = 0; i <= 5; i++) {
            if (
              i === actualCase.x ||
              i === actualCase.x + 1 ||
              i === actualCase.x + 2
            ) {
            } else {
              arrayY.push({
                y: 0,
                h: 0,
                w: 0,
                x: i,
                i: 'empty',
              })
            }
          }
        }
      } else {
        for (let i = 0; i <= 5; i++) {
          if (
            i === actualCase.x ||
            i === actualCase.x + 1 ||
            i === actualCase.x + 2
          ) {
          } else {
            arrayY.push({
              y: 0,
              h: 0,
              w: 0,
              x: i,
              i: 'empty',
            })
          }
        }
      }
      if (secondRowCases.length !== 0) {
        if (secondRowCases[0].w !== 3) {
          for (let i = 0; i <= 5; i++) {
            if (
              i === actualCase.x ||
              i === actualCase.x + 1 ||
              i === actualCase.x + 2
            ) {
            } else {
              arrayY2.push({
                y: 0,
                h: 0,
                w: 0,
                x: i,
                i: 'empty',
              })
            }
          }
        }
      } else {
        for (let i = 0; i <= 5; i++) {
          if (
            i === actualCase.x ||
            i === actualCase.x + 1 ||
            i === actualCase.x + 2
          ) {
          } else {
            arrayY2.push({
              y: 0,
              h: 0,
              w: 0,
              x: i,
              i: 'empty',
            })
          }
        }
      }

      arrayY.forEach((element: any) => {
        if (!firstRowXs.includes(element.x)) {
          firstRowCases.push(element)
        }
      })
      arrayY2.forEach((element: any) => {
        if (!secondRowXs.includes(element.x)) {
          secondRowCases.push(element)
        }
      })

      const newFirstRowCases = sortHorizontal(firstRowCases)
      const newSecondRowCases = sortHorizontal(secondRowCases)

      const widgetsFirstRow = newFirstRowCases.map((y: any) => {
        if (y.i !== 'empty') {
          return findWidget(y.i)
        } else {
          return hiddenWidget
        }
      })
      const widgetsSecondRow = newSecondRowCases.map((y2: any) => {
        if (y2.i !== 'empty') {
          return findWidget(y2.i)
        } else {
          return hiddenWidget
        }
      })

      return getSpecialWidgetConfig(
        specialCase,
        widgetsFirstRow,
        widgetsSecondRow
      )
    })
    return specialWidgets
  }

  function buildDashboardConfig() {
    const specialCases: number[] = findSpecialCase(layout)
    const excludedIds = generateListExcludedIds(specialCases)
    const newLayout = removeExcludedIds(layout, excludedIds)
    const duplicateY: number[] = findDuplicateY(newLayout)
    const horizontalListWidgets: any[] = createHorizontalListWidgets(
      newLayout,
      duplicateY
    )
    const specialCasesWidgets: any[] = createSpecialCaseWidgets(specialCases)
    const verticalWidgets: any[] = createVerticalWidgets(newLayout, duplicateY)
    const sortedWidgets: any[] = createSortedWidgetsList(
      horizontalListWidgets,
      verticalWidgets,
      specialCasesWidgets
    )

    const configObject: any = {
      widgetConfiguration: {
        type: LayoutWidget.verticalList,
        widgets: sortedWidgets,
      },
    }
    return configObject
  }

  function sortHorizontal(layout: Layout[]) {
    const sortedLayout = [...layout]
    sortedLayout.sort((a: any, b: any) => {
      return a.x - b.x
    })
    return sortedLayout
  }

  function sortVertical(layout: any[]) {
    const sortedLayout = [...layout]
    sortedLayout.sort((a: any, b: any) => {
      return a.y - b.y
    })
    return sortedLayout
  }
  function findWidget(layoutObjectId: any) {
    const matchedWidget = listOfWidgets.find(
      (widget: any) => widget.id === layoutObjectId
    )
    return matchedWidget
  }

  function createHorizontalListWidgets(newLayout: any, duplicateY: number[]) {
    const horizontalListWidgets: any[] = duplicateY.map((y) => {
      const horizontalLayout = newLayout.filter((layoutObject: Layout) => {
        return layoutObject.y === y
      })
      // solves rendering widgets freely in a row
      const possibleX = [0, 1, 2, 3, 4, 5]
      const reducedXs = horizontalLayout.reduce((array: any, element: any) => {
        if (element.w === 3) {
          return [...array, element.x, element.x + 1, element.x + 2]
        }
        return [...array, element.x]
      }, [])
      const actualX = possibleX.filter((x: any) => {
        return !reducedXs.includes(x)
      })
      actualX.forEach((x: any) => {
        horizontalLayout.push({
          y: 0,
          h: 0,
          w: 0,
          x: x,
          i: 'empty',
        })
      })
      const sortedHorizontalLayout = sortHorizontal(horizontalLayout)

      const horizontalWidgets = sortedHorizontalLayout.reduce(
        (widgets: any, {i: layoutObjectId}) => {
          const matchedWidget = findWidget(layoutObjectId)
          return matchedWidget
            ? [
                ...widgets,
                createVerticalListWithFlex(
                  [matchedWidget],
                  matchedWidget.style.flex
                ),
              ]
            : [...widgets, createVerticalListWithFlex([], 1)]
        },
        []
      )
      return createHorizonatalListWithY(horizontalWidgets, y)
    })

    return horizontalListWidgets
  }

  function createVerticalWidgets(newLayout: any, duplicateY: number[]) {
    const verticalLayout = newLayout.filter((layoutObject: Layout) => {
      if (!duplicateY.includes(layoutObject.y)) {
        return layoutObject
      }
    })

    const verticalWidgets = verticalLayout.map((layoutObject: any) => {
      let object: any = {}
      // Because we need y to place objects properly, we cannot define object as a Widget-object since y does not exist on Widget-object.
      listOfWidgets.forEach((widget: any) => {
        if (widget.id === layoutObject.i) {
          object = widget
          object.y = layoutObject.y
        }
      })
      // solves size in render if object is "alone".
      const widgetList: any = []
      if (layoutObject.w !== 3) {
        if (layoutObject.w === 6) {
          widgetList.push(
            createVerticalListWithFlex([object], object.style.flex)
          )
        } else {
          for (let i = 0; i <= 5; i++) {
            if (layoutObject.x !== i) {
              widgetList.push(createVerticalListWithFlex([], 1))
            } else {
              widgetList.push(
                createVerticalListWithFlex([object], object.style.flex)
              )
            }
          }
        }
      } else {
        for (let i = 0; i <= 5; i++) {
          if (i === layoutObject.x + 1 || i === layoutObject.x + 2) {
            continue
          }
          if (i === layoutObject.x) {
            widgetList.push(
              createVerticalListWithFlex([object], object.style.flex)
            )
          } else {
            widgetList.push(createVerticalListWithFlex([], 1))
          }
        }
      }
      return createHorizonatalListWithY(widgetList, object.y)
    })
    return verticalWidgets
  }

  function createSortedWidgetsList(
    widgetsList1: any[],
    widgetsList2: any[],
    widgetList3: any[]
  ) {
    const widgets = [...widgetsList1, ...widgetsList2, ...widgetList3]
    const sortedWidgets = sortVertical(widgets)
    return sortedWidgets
  }

  function renderList() {
    const layoutData = layout.map((div: any) => {
      return (
        <div
          key={div.i}
          data-grid={{
            x: div.x === null ? Infinity : div.x,
            y: div.y === null ? Infinity : div.y,
            w: div.w,
            h: div.h,
          }}
        >
          <Tooltip title='Remove widget'>
            <IconButton
              style={{
                position: 'fixed',
                right: 0,
                top: 0,
                zIndex: 100,
                cursor: 'pointer',
              }}
              onClick={() => {
                removeWidget(div.i)
                  .then(() => {
                    showNotification(
                      'Widget has been removed.',
                      'success',
                      3000
                    )
                  })
                  .catch(() => {
                    showNotification('Something went wrong', 'error', 3000)
                  })
              }}
            >
              <CloseIcon />
            </IconButton>
          </Tooltip>
          {renderWidget(
            listOfWidgets.filter((widget: any) => {
              return widget.id === div.i
            })[0]
          )}
        </div>
      )
    })
    return layoutData
  }

  return (
    <>
      <GridLayout
        onLayoutChange={onLayoutChange}
        className='layout'
        cols={6}
        rowHeight={180}
        width={window.innerWidth - 40}
        margin={[40, 30]}
      >
        {layout && renderList()}
      </GridLayout>
      <StyledButton variant='outlined' color='primary' onClick={saveRender}>
        Save/Render
      </StyledButton>
    </>
  )
}
const mapStateToProps = (state: any) => ({
  listOfWidgets: state.dashboard.widgets,
  buckets: state.user.dashboard.bucket,
  layout: state.dashboard.layout,
  dashboard: state.user.dashboard,
})

const ConnectedComponent = connect(mapStateToProps, {
  updateLayout,
  updateDashboard,
  addWidget,
  removeWidget,
  showNotification,
})(DashboardGrid)

export {ConnectedComponent as DashboardGrid}
